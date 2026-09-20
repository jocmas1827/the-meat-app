import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { LEVELS, PRODUCTS, fmtDate, fmtDateShort, levelFor, money, nextLevel } from '../data'
import { useStore, useToast } from '../store'
import { Card, Chat, Check, Chevron, ChevronDown, Clock, Edit, Flame, Globe, Logout, Mail, Moon, Phone, Pin, Plus, Star, Users } from '../icons'
import { Confirm, EASE, Empty, GhostButton, GoldButton, Page, ProductCard, SubHeader, Toggle, rise, stagger } from '../components/ui'
import { initials } from './Cuenta'

const Shell = ({ title, children, right, backTo = '/cuenta', className = '' }) => (
  <Page variant="push" className={`sub ${className}`}>
    <SubHeader title={title} backTo={backTo} right={right} />
    <div className="wrap">{children}</div>
  </Page>
)

const STATUS = {
  Confirmada: 'ok',
  Completada: 'muted',
  Cancelada: 'danger',
  Entregado: 'muted',
  'En preparación': 'ok',
}
const Status = ({ s }) => <span className={`status status--${STATUS[s] ?? 'muted'}`}>{s}</span>

/* ---------- Mis reservas ---------- */
export function MisReservas() {
  const { reservations, dispatch } = useStore()
  const { show } = useToast()
  const [cancel, setCancel] = useState(null)
  const upcoming = reservations.filter((r) => r.status === 'Confirmada')
  const past = reservations.filter((r) => r.status !== 'Confirmada')

  const Item = ({ r }) => (
    <motion.li variants={rise} className="card rcard">
      <div className="rcard__head">
        <span className="rcard__id">{r.id}</span>
        <Status s={r.status} />
      </div>
      <div className="rcard__main">
        <span className="rcard__date">{fmtDate(r.date)}</span>
        <div className="rcard__meta">
          <span>
            <Clock size={15} /> {r.time}
          </span>
          <span>
            <Users size={15} /> {r.people} {r.people === 1 ? 'persona' : 'personas'}
          </span>
        </div>
        {r.occasion && <span className="rcard__occ">✦ {r.occasion}</span>}
        {r.note && <span className="rcard__note">“{r.note}”</span>}
      </div>
      {r.status === 'Confirmada' && (
        <div className="rcard__actions">
          <Link to="/reservas" className="textlink textlink--sm">
            Nueva reserva
          </Link>
          <button type="button" className="textlink textlink--sm textlink--danger" onClick={() => setCancel(r)}>
            Cancelar reserva
          </button>
        </div>
      )}
    </motion.li>
  )

  return (
    <Shell title="Mis reservas">
      {reservations.length === 0 ? (
        <Empty title="Aún no tienes reservas" body="Reserva tu mesa y vive la experiencia The Meat." action={<GoldButton as={Link} to="/reservas" className="btn-gold--md">Reservar mesa</GoldButton>} />
      ) : (
        <>
          {upcoming.length > 0 && (
            <>
              <h2 className="h3 sub__section">Próximas</h2>
              <motion.ul className="list" variants={stagger(0.05, 0.08)} initial="hidden" animate="show">
                {upcoming.map((r) => (
                  <Item key={r.id} r={r} />
                ))}
              </motion.ul>
            </>
          )}
          {past.length > 0 && (
            <>
              <h2 className="h3 sub__section">Historial</h2>
              <motion.ul className="list" variants={stagger(0.15, 0.06)} initial="hidden" animate="show">
                {past.map((r) => (
                  <Item key={r.id} r={r} />
                ))}
              </motion.ul>
            </>
          )}
          <div className="sub__cta">
            <GoldButton as={Link} to="/reservas" className="btn-gold--block">
              Nueva reserva
            </GoldButton>
          </div>
        </>
      )}
      <Confirm
        open={!!cancel}
        title="¿Cancelar esta reserva?"
        body={cancel ? `${fmtDate(cancel.date)} a las ${cancel.time}, mesa para ${cancel.people}.` : ''}
        confirmLabel="Sí, cancelar"
        danger
        onClose={() => setCancel(null)}
        onConfirm={() => {
          dispatch({ type: 'res/cancel', id: cancel.id })
          setCancel(null)
          show('Reserva cancelada')
        }}
      />
    </Shell>
  )
}

/* ---------- Mis pedidos ---------- */
export function MisPedidos() {
  const { orders } = useStore()
  const [open, setOpen] = useState(orders[0]?.id ?? null)
  return (
    <Shell title="Mis pedidos">
      {orders.length === 0 ? (
        <Empty title="Aún no tienes pedidos" body="Tu historial aparecerá aquí." action={<GoldButton as={Link} to="/menu" className="btn-gold--md">Explorar menú</GoldButton>} />
      ) : (
        <motion.ul className="list" variants={stagger(0.05, 0.08)} initial="hidden" animate="show">
          {orders.map((o) => {
            const isOpen = open === o.id
            return (
              <motion.li key={o.id} variants={rise} className="card ocard">
                <button type="button" className="ocard__head" onClick={() => setOpen(isOpen ? null : o.id)} aria-expanded={isOpen}>
                  <div>
                    <span className="ocard__id">{o.id}</span>
                    <span className="ocard__date">{fmtDateShort(o.date)}</span>
                  </div>
                  <div className="ocard__right">
                    <Status s={o.status} />
                    <span className="ocard__total">{money(o.total)}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="ocard__chev">
                      <ChevronDown size={18} />
                    </motion.span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className="ocard__body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                      <ul className="ocard__items">
                        {o.items.map((it, i) => (
                          <li key={i}>
                            <span className="ocard__qty">{it.qty}×</span>
                            <span className="ocard__iname">
                              {it.name}
                              {it.note && <small>{it.note}</small>}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="ocard__foot">
                        {o.mode && <span className="ocard__mode">{{ mesa: 'En mesa', recoger: 'Para recoger', domicilio: 'A domicilio' }[o.mode]}</span>}
                        <Link to="/menu" className="textlink textlink--sm">
                          Volver a pedir
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </motion.ul>
      )}
    </Shell>
  )
}

/* ---------- Favoritos ---------- */
export function Favoritos() {
  const { favorites } = useStore()
  const items = favorites.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)
  return (
    <Shell title="Mis favoritos">
      {items.length === 0 ? (
        <Empty title="Sin favoritos todavía" body="Toca el corazón en cualquier plato para guardarlo aquí." action={<GoldButton as={Link} to="/menu" className="btn-gold--md">Explorar menú</GoldButton>} />
      ) : (
        <motion.div className="grid2" variants={stagger(0.05, 0.08)} initial="hidden" animate="show">
          <AnimatePresence>
            {items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Shell>
  )
}

/* ---------- Direcciones ---------- */
export function Direcciones() {
  const { addresses, dispatch } = useStore()
  const { show } = useToast()
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ label: '', line: '', city: 'Bogotá' })
  const [del, setDel] = useState(null)
  const valid = form.label.trim() && form.line.trim() && form.city.trim()

  const save = (e) => {
    e.preventDefault()
    if (!valid) return
    dispatch({ type: 'addr/add', addr: { label: form.label.trim(), line: form.line.trim(), city: form.city.trim() } })
    setForm({ label: '', line: '', city: 'Bogotá' })
    setAdding(false)
    show('Dirección guardada')
  }

  return (
    <Shell title="Mis direcciones">
      <motion.ul className="list" variants={stagger(0.05, 0.08)} initial="hidden" animate="show">
        <AnimatePresence initial={false}>
          {addresses.map((a) => (
            <motion.li key={a.id} variants={rise} layout exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }} className={`card acard ${a.isDefault ? 'is-default' : ''}`}>
              <span className="acard__icon">
                <Pin size={20} />
              </span>
              <div className="acard__body">
                <span className="acard__label">
                  {a.label} {a.isDefault && <span className="pill pill--tiny">Predeterminada</span>}
                </span>
                <span className="acard__line">
                  {a.line}, {a.city}
                </span>
                <div className="acard__actions">
                  {!a.isDefault && (
                    <button type="button" className="textlink textlink--sm" onClick={() => { dispatch({ type: 'addr/default', id: a.id }); show('Dirección predeterminada actualizada') }}>
                      Usar como predeterminada
                    </button>
                  )}
                  <button type="button" className="textlink textlink--sm textlink--danger" onClick={() => setDel(a)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence initial={false}>
        {adding ? (
          <motion.form className="card form form--edit" onSubmit={save} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
            <h3 className="h3">Nueva dirección</h3>
            <label className="input" htmlFor="addr-label">
              <span>Nombre (Casa, Oficina…)</span>
              <input id="addr-label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Casa" maxLength={30} autoFocus />
            </label>
            <label className="input" htmlFor="addr-line">
              <span>Dirección</span>
              <input id="addr-line" value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })} placeholder="Cra 15 # 93-47, Apto 502" maxLength={80} />
            </label>
            <label className="input" htmlFor="addr-city">
              <span>Ciudad</span>
              <input id="addr-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={40} />
            </label>
            <div className="form__actions">
              <GhostButton type="button" onClick={() => setAdding(false)}>
                Cancelar
              </GhostButton>
              <button type="submit" className="btn-solid" disabled={!valid}>
                Guardar
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div key="addbtn" className="sub__cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button type="button" className="btn-outline" onClick={() => setAdding(true)}>
              <Plus size={18} /> Agregar dirección
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Confirm open={!!del} title="¿Eliminar dirección?" body={del ? `${del.label} · ${del.line}` : ''} confirmLabel="Eliminar" danger onClose={() => setDel(null)} onConfirm={() => { dispatch({ type: 'addr/remove', id: del.id }); setDel(null); show('Dirección eliminada') }} />
    </Shell>
  )
}

/* ---------- Métodos de pago ---------- */
export function Pagos() {
  const { payments, dispatch } = useStore()
  const { show } = useToast()
  return (
    <Shell title="Métodos de pago">
      <motion.ul className="list" variants={stagger(0.05, 0.08)} initial="hidden" animate="show">
        {payments.map((p) => (
          <motion.li key={p.id} variants={rise} className={`card pay ${p.isDefault ? 'is-default' : ''}`}>
            <span className="pay__chip">
              <Card size={22} />
            </span>
            <div className="pay__body">
              <span className="pay__brand">
                {p.brand} •••• {p.last4}
              </span>
              <span className="pay__exp">Vence {p.exp}</span>
            </div>
            {p.isDefault ? (
              <span className="pill pill--tiny">Predeterminada</span>
            ) : (
              <button type="button" className="textlink textlink--sm" onClick={() => { dispatch({ type: 'pay/default', id: p.id }); show('Método de pago actualizado') }}>
                Usar
              </button>
            )}
          </motion.li>
        ))}
      </motion.ul>
      <div className="card note-card">
        <p>
          Por tu seguridad, las tarjetas nuevas se agregan al momento de pagar a través de la pasarela certificada. También puedes pagar en efectivo o con datáfono en el restaurante.
        </p>
      </div>
    </Shell>
  )
}

/* ---------- Puntos ---------- */
export function Puntos() {
  const { user, orders } = useStore()
  const level = levelFor(user.points)
  const next = nextLevel(user.points)
  const progress = next ? Math.min(1, (user.points - level.min) / (next.min - level.min)) : 1
  const perks = {
    Aprendiz: ['1 punto por cada $1.000', 'Cumpleaños con postre de cortesía'],
    Parrillero: ['1 punto por cada $1.000', 'Cumpleaños con postre de cortesía', 'Reserva prioritaria fines de semana'],
    Maestro: ['1,5 puntos por cada $1.000', 'Entrada de cortesía cada mes', 'Reserva prioritaria y mesa preferencial', 'Invitaciones a catas de cortes'],
    Leyenda: ['2 puntos por cada $1.000', 'Cena de aniversario de cortesía', 'Acceso al menú de autor del chef', 'Todo lo del nivel Maestro'],
  }[level.name]

  return (
    <Shell title="Mis puntos The Meat" className="puntos">
      <motion.div className="card pts" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
        <span className="eyebrow">Nivel {level.name}</span>
        <span className="pts__num display">{user.points}</span>
        <span className="pts__label">puntos acumulados</span>
        <div className="pts__bar">
          <motion.span className="pts__fill" initial={{ scaleX: 0 }} animate={{ scaleX: progress }} transition={{ delay: 0.3, duration: 1.1, ease: EASE }} />
        </div>
        <span className="pts__next">{next ? `${next.min - user.points} puntos para ser ${next.name}` : 'Has alcanzado el nivel máximo'}</span>
      </motion.div>

      <h2 className="h3 sub__section">Niveles</h2>
      <motion.ul className="levels" variants={stagger(0.2, 0.07)} initial="hidden" animate="show">
        {LEVELS.map((l) => {
          const reached = user.points >= l.min
          return (
            <motion.li key={l.name} variants={rise} className={`level ${reached ? 'is-reached' : ''} ${l.name === level.name ? 'is-current' : ''}`}>
              <span className="level__icon">{reached ? <Flame size={18} /> : <Star size={18} />}</span>
              <span className="level__name">{l.name}</span>
              <span className="level__min">{l.min === 0 ? 'Desde el inicio' : `${l.min} pts`}</span>
            </motion.li>
          )
        })}
      </motion.ul>

      <h2 className="h3 sub__section">Tus beneficios</h2>
      <ul className="perks">
        {perks.map((p) => (
          <li key={p}>
            <Check size={16} /> {p}
          </li>
        ))}
      </ul>

      <h2 className="h3 sub__section">Historial</h2>
      <ul className="hist">
        {orders.map((o) => (
          <li key={o.id}>
            <span>
              Pedido {o.id}
              <small>{fmtDateShort(o.date)}</small>
            </span>
            <b>+{Math.round(o.total / 1000)}</b>
          </li>
        ))}
        <li>
          <span>
            Bono de bienvenida<small>Al crear tu cuenta</small>
          </span>
          <b>+100</b>
        </li>
      </ul>
    </Shell>
  )
}

/* ---------- Notificaciones ---------- */
export function Notificaciones() {
  const { notifications, dispatch } = useStore()
  const items = [
    ['reservas', 'Reservas', 'Confirmaciones y recordatorios de tu mesa'],
    ['pedidos', 'Pedidos', 'Estado de tu pedido en tiempo real'],
    ['promociones', 'Promociones', 'Ofertas y beneficios exclusivos'],
    ['novedades', 'Novedades', 'Nuevos cortes, eventos y catas'],
  ]
  return (
    <Shell title="Notificaciones">
      <motion.ul className="list" variants={stagger(0.05, 0.07)} initial="hidden" animate="show">
        {items.map(([k, t, d]) => (
          <motion.li key={k} variants={rise} className="card nrow">
            <div>
              <span className="nrow__title">{t}</span>
              <span className="nrow__desc">{d}</span>
            </div>
            <Toggle id={`n-${k}`} label={t} checked={notifications[k]} onChange={() => dispatch({ type: 'notif/toggle', key: k })} />
          </motion.li>
        ))}
      </motion.ul>
    </Shell>
  )
}

/* ---------- Ayuda ---------- */
const FAQ = [
  ['¿Puedo modificar mi reserva?', 'Sí. Desde “Mis reservas” puedes cancelarla y crear una nueva con la fecha u hora que prefieras, sin costo.'],
  ['¿Hasta qué hora reciben pedidos?', 'La cocina recibe pedidos de 12:00 PM a 10:00 PM todos los días. Los domicilios cierran a las 9:30 PM.'],
  ['¿Cómo funcionan los puntos?', 'Acumulas 1 punto por cada $1.000 en tus pedidos. Al alcanzar cada nivel desbloqueas beneficios que puedes ver en “Mis puntos”.'],
  ['¿Tienen opciones sin gluten?', 'Todos nuestros cortes y la mayoría de acompañantes son libres de gluten. Indícalo en la nota de tu reserva o pedido.'],
]
export function Ayuda() {
  const { show } = useToast()
  const [open, setOpen] = useState(0)
  const [msg, setMsg] = useState('')
  return (
    <Shell title="Ayuda y soporte">
      <motion.div className="contact" variants={stagger(0.05, 0.07)} initial="hidden" animate="show">
        {[
          [Chat, 'Chat', 'Respuesta en minutos'],
          [Phone, 'Llamar', 'Lun a Dom · 11 AM – 10 PM'],
          [Mail, 'Correo', 'Respuesta en 24 h'],
        ].map(([Icon, t, d]) => (
          <motion.button key={t} variants={rise} type="button" className="contact__btn" onClick={() => show(`Te conectaremos por ${t.toLowerCase()} en breve`)}>
            <Icon size={22} />
            <b>{t}</b>
            <small>{d}</small>
          </motion.button>
        ))}
      </motion.div>

      <h2 className="h3 sub__section">Preguntas frecuentes</h2>
      <ul className="faq">
        {FAQ.map(([q, a], i) => (
          <li key={q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
            <button type="button" className="faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p className="faq__a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: EASE }}>
                  {a}
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>

      <h2 className="h3 sub__section">Cuéntanos tu caso</h2>
      <form
        className="card form form--edit"
        onSubmit={(e) => {
          e.preventDefault()
          if (!msg.trim()) return
          setMsg('')
          show('Mensaje enviado. Te responderemos pronto.')
        }}
      >
        <textarea id="help-msg" className="textarea" rows={3} placeholder="Escribe aquí…" value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={500} />
        <div className="form__actions">
          <button type="submit" className="btn-solid" disabled={!msg.trim()}>
            Enviar
          </button>
        </div>
      </form>
    </Shell>
  )
}

/* ---------- Ajustes ---------- */
export function Ajustes() {
  const { user, dispatch } = useStore()
  const { show } = useToast()
  const nav = useNavigate()
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [ask, setAsk] = useState(false)
  const valid = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email)

  const save = (e) => {
    e.preventDefault()
    if (!valid) return
    dispatch({ type: 'user/update', patch: { name: name.trim(), email: email.trim() } })
    setEdit(false)
    show('Perfil actualizado')
  }

  return (
    <Shell title="Ajustes">
      <div className="card settings__profile">
        <div className="avatar avatar--sm">
          <span className="avatar__ring" />
          <span className="avatar__initials">{initials(user.name)}</span>
        </div>
        {edit ? (
          <form onSubmit={save} className="settings__form">
            <label className="input" htmlFor="set-name">
              <span>Nombre</span>
              <input id="set-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoFocus />
            </label>
            <label className="input" htmlFor="set-email">
              <span>Correo</span>
              <input id="set-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={60} />
            </label>
            <div className="form__actions">
              <GhostButton type="button" onClick={() => { setEdit(false); setName(user.name); setEmail(user.email) }}>
                Cancelar
              </GhostButton>
              <button type="submit" className="btn-solid" disabled={!valid}>
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <div className="settings__who">
            <b>{user.name}</b>
            <span>{user.email}</span>
            <button type="button" className="textlink textlink--sm" onClick={() => setEdit(true)}>
              <Edit size={15} /> Editar perfil
            </button>
          </div>
        )}
      </div>

      <ul className="rows rows--flat">
        <li>
          <div className="row">
            <span className="row__icon">
              <Globe size={20} />
            </span>
            <span className="row__label">Idioma</span>
            <span className="row__value">Español</span>
          </div>
        </li>
        <li>
          <div className="row">
            <span className="row__icon">
              <Moon size={20} />
            </span>
            <span className="row__label">Tema</span>
            <span className="row__value">Oscuro</span>
          </div>
        </li>
        <li>
          <Link to="/cuenta/notificaciones" className="row">
            <span className="row__icon">
              <Chat size={20} />
            </span>
            <span className="row__label">Notificaciones</span>
            <span className="row__chev">
              <Chevron size={18} />
            </span>
          </Link>
        </li>
        <li>
          <div className="row">
            <span className="row__icon">
              <Star size={20} />
            </span>
            <span className="row__label">Versión</span>
            <span className="row__value">1.0.0</span>
          </div>
        </li>
      </ul>

      <div className="sub__cta">
        <button type="button" className="btn-outline" onClick={() => setAsk(true)}>
          <Logout size={20} /> Cerrar sesión
        </button>
      </div>
      <Confirm open={ask} title="¿Cerrar sesión?" body="Tu pedido en curso se vaciará. Tus reservas y puntos se conservan." confirmLabel="Cerrar sesión" danger onClose={() => setAsk(false)} onConfirm={() => { setAsk(false); dispatch({ type: 'session/end' }); show('Sesión cerrada'); nav('/', { replace: true }) }} />
    </Shell>
  )
}
