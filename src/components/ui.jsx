import { forwardRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { A, money } from '../data'
import { useStore, useToast } from '../store'
import { Back, Calendar, Cart, Check, Heart, Home, MenuIcon, Minus, Plus, User } from '../icons'

export const EASE = [0.22, 1, 0.36, 1]

export const stagger = (delay = 0.08, each = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})
export const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

/* ---------- Page (screen transition wrapper) ---------- */
const pageVariants = {
  fade: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: 'easeIn' } },
  },
  push: {
    initial: { opacity: 0, x: 44 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.36, ease: EASE } },
    exit: { opacity: 0, x: 24, transition: { duration: 0.2, ease: 'easeIn' } },
  },
  zoom: {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.35, ease: 'easeIn' } },
  },
}

export const Page = forwardRef(function Page({ children, variant = 'fade', className = '', noTabs = false }, ref) {
  const v = pageVariants[variant]
  return (
    <motion.div
      ref={ref}
      className={`page ${noTabs ? 'page--notabs' : ''} ${className}`}
      variants={v}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
})

/* ---------- Headers ---------- */
export function Wordmark({ size = 'md' }) {
  return (
    <span className={`wordmark wordmark--${size}`}>
      <img src={A('logo-isotipo.png')} alt="" className="wordmark__bull" />
      <span className="wordmark__text">
        <span className="wordmark__line">
          <em>The</em> <b>MEAT</b>
        </span>
        <span className="wordmark__sub">Restaurant</span>
      </span>
    </span>
  )
}

export function BrandHeader({ left, right, transparent = false }) {
  return (
    <header className={`header ${transparent ? 'header--transparent' : ''}`}>
      <div className="header__slot">{left}</div>
      <Link to="/inicio" className="header__brand" aria-label="Ir al inicio">
        <Wordmark />
      </Link>
      <div className="header__slot header__slot--right">{right}</div>
    </header>
  )
}

// Counts in-app navigations so "back" only pops history the app itself created
export const navHistory = { count: 0 }

export function BackButton({ to, fallback = '/inicio', className = '', label = 'Volver', float = false }) {
  const nav = useNavigate()
  return (
    <button
      type="button"
      className={`iconbtn ${float ? 'iconbtn--float' : ''} ${className}`}
      aria-label={label}
      onClick={() => (to ? nav(to) : navHistory.count > 1 ? nav(-1) : nav(fallback, { replace: true }))}
    >
      <Back />
    </button>
  )
}

export function CartButton() {
  const { cartCount } = useStore()
  return (
    <Link to="/pedido" className="iconbtn iconbtn--cart" aria-label={`Ver pedido, ${cartCount} productos`}>
      <Cart />
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.span
            key={cartCount}
            className="badge"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.25, 1], opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {cartCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}

export function SubHeader({ title, right, backTo, fallback }) {
  return (
    <header className="header header--sub">
      <div className="header__slot">
        <BackButton to={backTo} fallback={fallback} />
      </div>
      <h1 className="header__title">{title}</h1>
      <div className="header__slot header__slot--right">{right}</div>
    </header>
  )
}

/* ---------- Tab bar ---------- */
const TABS = [
  { to: '/inicio', label: 'Inicio', Icon: Home },
  { to: '/menu', label: 'Menú', Icon: MenuIcon },
  { to: '/reservas', label: 'Reservas', Icon: Calendar },
  { to: '/cuenta', label: 'Mi cuenta', Icon: User },
]

export function TabBar() {
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}>
          {({ isActive }) => (
            <>
              {isActive && <motion.span layoutId="tab-glow" className="tab__glow" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="tab__icon">
                <Icon />
              </span>
              <span className="tab__label">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

/* ---------- Buttons ---------- */
export function GoldButton({ children, className = '', as: Tag = 'button', shimmer = true, ...rest }) {
  return (
    <Tag className={`btn-gold ${shimmer ? 'btn-gold--shimmer' : ''} ${className}`} {...rest}>
      <span className="btn-gold__label">{children}</span>
    </Tag>
  )
}

export function GhostButton({ children, className = '', as: Tag = 'button', ...rest }) {
  return (
    <Tag className={`btn-ghost ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function Stepper({ value, onChange, min = 1, max = 20, size = 'md' }) {
  return (
    <div className={`stepper stepper--${size}`}>
      <button type="button" className="stepper__btn" aria-label="Quitar uno" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>
        <Minus size={18} />
      </button>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="stepper__value"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <button type="button" className="stepper__btn" aria-label="Agregar uno" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>
        <Plus size={18} />
      </button>
    </div>
  )
}

export function Toggle({ checked, onChange, label, id }) {
  return (
    <button id={id} type="button" role="switch" aria-checked={checked} aria-label={label} className={`toggle ${checked ? 'is-on' : ''}`} onClick={() => onChange(!checked)}>
      <span className="toggle__knob" />
    </button>
  )
}

export function FavButton({ id, className = '', float = false }) {
  const { favorites, dispatch } = useStore()
  const { show } = useToast()
  const on = favorites.includes(id)
  return (
    <motion.button
      type="button"
      className={`iconbtn ${float ? 'iconbtn--float' : ''} iconbtn--fav ${on ? 'is-on' : ''} ${className}`}
      aria-pressed={on}
      aria-label={on ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({ type: 'fav/toggle', id })
        show(on ? 'Quitado de favoritos' : 'Agregado a favoritos')
      }}
    >
      <motion.span key={on ? 'on' : 'off'} initial={{ scale: 0.6 }} animate={{ scale: [0.6, 1.25, 1] }} transition={{ duration: 0.35 }} style={{ display: 'flex' }}>
        <Heart filled={on} />
      </motion.span>
    </motion.button>
  )
}

/* ---------- Product card ---------- */
export function ProductCard({ p, variant = 'grid' }) {
  return (
    <motion.div variants={rise} className={`pcard pcard--${variant}`}>
      <Link to={`/producto/${p.id}`} className="pcard__link">
        <div className="pcard__media">
          <img src={A(p.image)} alt={p.name} loading="lazy" />
          {p.best && <span className="pill pill--best">Best Seller</span>}
          <FavButton id={p.id} className="pcard__fav" />
        </div>
        <div className="pcard__body">
          <span className="pcard__name">{p.name}</span>
          <span className="pcard__price">{money(p.price)}</span>
        </div>
      </Link>
    </motion.div>
  )
}

/* ---------- Portal: overlays live at device level, outside scrolling pages ---------- */
function Portal({ children }) {
  const host = typeof document !== 'undefined' ? document.getElementById('device') : null
  return host ? createPortal(children, host) : children
}

/* ---------- Bottom sheet picker ---------- */
export function Sheet({ open, onClose, title, options, value, onSelect, renderOption }) {
  const listRef = useRef(null)
  useEffect(() => {
    if (!open || !listRef.current) return
    const list = listRef.current
    const el = list.querySelector('[aria-selected="true"]')
    if (el) list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.offsetHeight / 2
  }, [open])
  return (
    <AnimatePresence>
      {open && (
        <Portal key="sheet">
          <motion.div className="sheet__backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} />
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => info.offset.y > 90 && onClose()}
          >
            <div className="sheet__grab" />
            <h3 className="sheet__title">{title}</h3>
            <div className="sheet__list" ref={listRef} role="listbox">
              {options.map((o) => {
                const val = typeof o === 'string' ? o : o.value
                const sel = val === value
                return (
                  <button
                    key={val}
                    type="button"
                    role="option"
                    aria-selected={sel}
                    className={`sheet__opt ${sel ? 'is-selected' : ''}`}
                    onClick={() => {
                      onSelect(val)
                      onClose()
                    }}
                  >
                    <span>{renderOption ? renderOption(o) : typeof o === 'string' ? o : o.label}</span>
                    {sel && <Check size={18} />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  )
}

/* ---------- Confirm dialog ---------- */
export function Confirm({ open, title, body, confirmLabel = 'Confirmar', danger = false, onConfirm, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <Portal key="dialog">
          <motion.div className="sheet__backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            className="dialog"
            role="alertdialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <h3 className="dialog__title">{title}</h3>
            {body && <p className="dialog__body">{body}</p>}
            <div className="dialog__actions">
              <GhostButton onClick={onClose}>Cancelar</GhostButton>
              <button type="button" className={`btn-solid ${danger ? 'btn-solid--danger' : ''}`} onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  )
}

/* ---------- Toast ---------- */
export function ToastHost() {
  const { toast } = useToast()
  return (
    <div className="toasthost" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className={`toast ${toast.kind ? `toast--${toast.kind}` : ''}`}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <span className="toast__dot" />
            <span>{toast.msg}</span>
            {toast.action && (
              <Link to={toast.action.to} className="toast__action">
                {toast.action.label}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Success overlay ---------- */
export function SuccessOverlay({ open, eyebrow, title, lines = [], primary, secondary }) {
  return (
    <AnimatePresence>
      {open && (
        <Portal key="success">
        <motion.div className="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <div className="success__glow" />
          <motion.div className="success__ring" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: EASE }}>
            <svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <motion.circle cx="32" cy="32" r="29" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15, duration: 0.8, ease: EASE }} />
              <motion.path d="M20 33l8 8 16-17" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.5, ease: EASE }} />
            </svg>
          </motion.div>
          <motion.div variants={stagger(0.9, 0.1)} initial="hidden" animate="show" className="success__copy">
            {eyebrow && (
              <motion.span variants={rise} className="eyebrow">
                {eyebrow}
              </motion.span>
            )}
            <motion.h2 variants={rise} className="display success__title">
              {title}
            </motion.h2>
            {lines.map((l, i) => (
              <motion.p key={i} variants={rise} className="success__line">
                {l}
              </motion.p>
            ))}
            <motion.div variants={rise} className="success__actions">
              {primary}
              {secondary}
            </motion.div>
          </motion.div>
        </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  )
}

/* ---------- Embers (canvas particles) ---------- */
export function Embers({ density = 42, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const parts = []
    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const spawn = (init) => ({
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.25 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 0.25,
      life: Math.random(),
      hue: 22 + Math.random() * 20,
      wob: Math.random() * Math.PI * 2,
    })
    resize()
    for (let i = 0; i < density; i++) parts.push(spawn(true))
    let t = 0
    const tick = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        p.y -= p.vy
        p.x += p.vx + Math.sin(t * 1.4 + p.wob) * 0.18
        p.life += 0.004
        if (p.y < -10 || p.life > 1) parts[i] = spawn(false)
        const a = Math.sin(Math.min(p.life, 1) * Math.PI) * 0.9
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 95%, 62%, ${a})`
        ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, ${a})`
        ctx.shadowBlur = 8
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [density, reduce])
  return <canvas ref={ref} className={`embers ${className}`} aria-hidden="true" />
}

/* ---------- Smoke layer ---------- */
export function Smoke({ opacity = 0.14 }) {
  return (
    <div className="smoke" aria-hidden="true" style={{ '--smoke-opacity': opacity, '--smoke-img': `url(${A('overlay-humo.png')})` }}>
      <span className="smoke__layer smoke__layer--a" />
      <span className="smoke__layer smoke__layer--b" />
    </div>
  )
}

/* ---------- Count-up number ---------- */
export function CountUp({ to, duration = 1.1 }) {
  const [v, setV] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return setV(to)
    let raf
    const t0 = performance.now()
    const step = (now) => {
      const k = Math.min(1, (now - t0) / (duration * 1000))
      const e = 1 - Math.pow(1 - k, 3)
      setV(Math.round(to * e))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, reduce])
  return <>{v}</>
}

export function Empty({ title, body, action }) {
  return (
    <div className="empty">
      <img src={A('logo-isotipo.png')} alt="" className="empty__bull" />
      <h3 className="empty__title">{title}</h3>
      {body && <p className="empty__body">{body}</p>}
      {action}
    </div>
  )
}
