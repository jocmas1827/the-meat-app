import { useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Navigate, useParams } from 'react-router-dom'
import { A, SIDES, TERMS, byId, money } from '../data'
import { useStore, useToast } from '../store'
import { ChevronDown } from '../icons'
import { BackButton, EASE, FavButton, GoldButton, Page, Sheet, Stepper, Toggle, rise, stagger } from '../components/ui'

export default function Product() {
  const { id } = useParams()
  const p = byId(id)
  if (!p) return <Navigate to="/menu" replace />
  return <ProductView key={p.id} p={p} />
}

function ProductView({ p }) {
  const { dispatch } = useStore()
  const { show } = useToast()
  const pageRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll({ container: pageRef })
  const imgY = useTransform(scrollY, [0, 400], [0, 120])
  const imgScale = useTransform(scrollY, [0, 400], [1, 1.15])

  const [qty, setQty] = useState(1)
  const [term, setTerm] = useState(p.options?.kind === 'term' ? p.options.default : null)
  const [side, setSide] = useState(p.options?.kind === 'burger' ? p.options.side : null)
  const [extras, setExtras] = useState({})
  const [sheet, setSheet] = useState(false)

  const extrasTotal = useMemo(
    () => (p.options?.kind === 'burger' ? p.options.extras.filter((e) => extras[e.id]).reduce((n, e) => n + e.price, 0) : 0),
    [extras, p.options],
  )
  const unit = p.price + extrasTotal

  const add = () => {
    const parts = []
    if (term) parts.push(term)
    if (side) parts.push(side)
    if (p.options?.kind === 'burger') p.options.extras.forEach((e) => extras[e.id] && parts.push(e.name))
    const summary = parts.join(' · ')
    const key = `${p.id}|${summary}`
    dispatch({ type: 'cart/add', item: { key, productId: p.id, qty, unit, summary } })
    show(`${p.name} agregado al pedido`, { action: { to: '/pedido', label: 'Ver pedido' }, duration: 2800 })
    setQty(1)
  }

  return (
    <Page ref={pageRef} variant="push" className="product">
      <div className="product__hero">
        <motion.img src={A(p.image)} alt={p.name} className="product__img" style={{ y: reduce ? 0 : imgY, scale: reduce ? 1 : imgScale }} initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease: EASE }} />
        <div className="product__grad" />
        <div className="product__topbar">
          <BackButton float fallback={`/menu/${p.cat}`} />
          <FavButton id={p.id} float />
        </div>
      </div>

      <motion.div className="product__body wrap" variants={stagger(0.2, 0.08)} initial="hidden" animate="show">
        <motion.div variants={rise} className="product__eyebrowrow">
          <span className="eyebrow">{p.tag}</span>
          {p.best && <span className="pill pill--outline">Best Seller</span>}
        </motion.div>
        <motion.div variants={rise} className="product__titlerow">
          <h1 className="display product__title">{p.name}</h1>
          <span className="product__price">{money(p.price)}</span>
        </motion.div>
        <motion.p variants={rise} className="product__desc">
          {p.desc}
        </motion.p>
        <motion.div variants={rise} className="rule rule--short" />

        {p.options?.kind === 'term' && (
          <motion.section variants={rise} className="opts">
            <h3 className="h3">{p.options.label}</h3>
            <div className="chips" role="radiogroup" aria-label={p.options.label}>
              {TERMS.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={term === t} className={`chip ${term === t ? 'is-on' : ''}`} onClick={() => setTerm(t)}>
                  <span className="chip__bg" />
                  <span className="chip__label">{t}</span>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {p.options?.kind === 'burger' && (
          <motion.section variants={rise} className="opts">
            <h3 className="h3">{p.options.label}</h3>
            <div className="optrow">
              <span className="optrow__label">Acompañamiento</span>
              <button type="button" className="select" onClick={() => setSheet(true)}>
                <span>{side}</span>
                <ChevronDown size={16} />
              </button>
            </div>
            {p.options.extras.map((e) => (
              <div className="optrow" key={e.id}>
                <span className="optrow__label">
                  {e.name} <span className="optrow__price">+{money(e.price)}</span>
                </span>
                <Toggle id={`extra-${e.id}`} label={e.name} checked={!!extras[e.id]} onChange={(v) => setExtras((x) => ({ ...x, [e.id]: v }))} />
              </div>
            ))}
            <Sheet open={sheet} onClose={() => setSheet(false)} title="Elige tu acompañamiento" options={SIDES} value={side} onSelect={setSide} />
          </motion.section>
        )}

        {!p.options && (
          <motion.section variants={rise} className="opts">
            <div className="note">
              <span className="note__dot" />
              Preparado al momento. Tiempo estimado: 15–20 min.
            </div>
          </motion.section>
        )}
      </motion.div>

      <motion.div className="product__cta" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45, duration: 0.6, ease: EASE }}>
        {(qty > 1 || extrasTotal > 0) && (
          <div className="product__summary">
            <span>
              {qty} × {money(unit)}
            </span>
            <b>{money(unit * qty)}</b>
          </div>
        )}
        <div className="product__ctarow">
          <Stepper value={qty} onChange={setQty} />
          <GoldButton onClick={add} className="product__add" aria-label={`Agregar al pedido, ${money(unit * qty)}`}>
            Agregar al pedido
          </GoldButton>
        </div>
      </motion.div>
    </Page>
  )
}
