import { useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { A, HOURS, fmtDate, nextDays } from '../data'
import { useStore } from '../store'
import { Calendar, ChevronDown, Clock, Users } from '../icons'
import { BrandHeader, CartButton, EASE, GhostButton, GoldButton, Page, Sheet, Smoke, SuccessOverlay, rise, stagger } from '../components/ui'

const PEOPLE = Array.from({ length: 12 }, (_, i) => i + 1)
const OCCASIONS = ['Sin ocasión especial', 'Cumpleaños', 'Aniversario', 'Cena de negocios', 'Celebración familiar']

export default function Reservas() {
  const nav = useNavigate()
  const { dispatch, user } = useStore()
  const reduce = useReducedMotion()
  const pageRef = useRef(null)
  const { scrollY } = useScroll({ container: pageRef })
  const y = useTransform(scrollY, [0, 300], [0, 80])

  const days = useMemo(() => nextDays(45), [])
  const [date, setDate] = useState(days[1])
  const [time, setTime] = useState('8:00 PM')
  const [people, setPeople] = useState(2)
  const [occasion, setOccasion] = useState(OCCASIONS[0])
  const [note, setNote] = useState('')
  const [sheet, setSheet] = useState(null)
  const [done, setDone] = useState(null)

  const confirm = () => {
    const res = { date, time, people, occasion: occasion === OCCASIONS[0] ? null : occasion, note: note.trim() || null }
    dispatch({ type: 'res/add', res })
    setDone(res)
  }

  return (
    <Page ref={pageRef} className="reservas">
      <BrandHeader right={<CartButton />} />

      <section className="hero hero--res">
        <motion.img src={A('reservas-interior.jpg')} alt="" className="hero__img" style={{ y: reduce ? 0 : y }} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: EASE }} />
        <Smoke opacity={0.16} />
        <div className="hero__grad" />
        <motion.div className="hero__copy" variants={stagger(0.15, 0.09)} initial="hidden" animate="show">
          <motion.span variants={rise} className="eyebrow">
            Reserva tu mesa
          </motion.span>
          <motion.h1 variants={rise} className="display hero__title">
            Grandes momentos
            <br />a la mesa
          </motion.h1>
          <motion.p variants={rise} className="lead">
            Buena comida, mejor compañía.
          </motion.p>
        </motion.div>
      </section>

      <motion.div className="wrap" variants={stagger(0.35, 0.08)} initial="hidden" animate="show">
        <motion.div variants={rise} className="card form">
          <FieldRow icon={<Calendar />} label="Fecha" value={fmtDate(date)} onClick={() => setSheet('date')} />
          <FieldRow icon={<Clock />} label="Hora" value={time} onClick={() => setSheet('time')} />
          <FieldRow icon={<Users />} label="Personas" value={`${people} ${people === 1 ? 'persona' : 'personas'}`} onClick={() => setSheet('people')} />
        </motion.div>

        <motion.div variants={rise} className="card form">
          <FieldRow icon={<span className="field__spark">✦</span>} label="Ocasión" value={occasion} onClick={() => setSheet('occ')} />
          <label className="field field--text" htmlFor="res-note">
            <span className="field__label">Nota para el equipo</span>
            <textarea id="res-note" className="textarea" rows={2} placeholder="Alergias, preferencia de mesa, sorpresa…" value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} />
          </label>
        </motion.div>

        <motion.div variants={rise} className="res__cta">
          <GoldButton onClick={confirm} className="btn-gold--block btn-gold--lg">
            Reservar mesa
          </GoldButton>
          <p className="res__fine">Reserva a nombre de {user.name}. Te esperamos hasta 15 minutos después de la hora.</p>
        </motion.div>
      </motion.div>

      <Sheet open={sheet === 'date'} onClose={() => setSheet(null)} title="Elige la fecha" options={days.map((d) => ({ value: d, label: fmtDate(d) }))} value={date} onSelect={setDate} />
      <Sheet open={sheet === 'time'} onClose={() => setSheet(null)} title="Elige la hora" options={HOURS} value={time} onSelect={setTime} />
      <Sheet open={sheet === 'people'} onClose={() => setSheet(null)} title="¿Cuántas personas?" options={PEOPLE.map((n) => ({ value: n, label: `${n} ${n === 1 ? 'persona' : 'personas'}` }))} value={people} onSelect={setPeople} />
      <Sheet open={sheet === 'occ'} onClose={() => setSheet(null)} title="¿Celebramos algo?" options={OCCASIONS} value={occasion} onSelect={setOccasion} />

      <SuccessOverlay
        open={!!done}
        eyebrow="Reserva confirmada"
        title="Te esperamos"
        lines={done ? [`${fmtDate(done.date)} · ${done.time}`, `Mesa para ${done.people} ${done.people === 1 ? 'persona' : 'personas'}${done.occasion ? ` · ${done.occasion}` : ''}`] : []}
        primary={<GoldButton onClick={() => nav('/cuenta/reservas')} className="btn-gold--block">Ver mis reservas</GoldButton>}
        secondary={<GhostButton onClick={() => { setDone(null); setNote('') }}>Listo</GhostButton>}
      />
    </Page>
  )
}

function FieldRow({ icon, label, value, onClick }) {
  return (
    <button type="button" className="field" onClick={onClick}>
      <span className="field__icon">{icon}</span>
      <span className="field__label">{label}</span>
      <span className="field__value">
        <span>{value}</span>
        <ChevronDown size={16} />
      </span>
    </button>
  )
}
