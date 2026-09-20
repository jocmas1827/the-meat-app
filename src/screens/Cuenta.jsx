import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { levelFor } from '../data'
import { useStore, useToast } from '../store'
import { Bag, Bell, Calendar, Card, Chevron, Flame, Gear, Heart, Help, Logout, Pin, Trophy } from '../icons'
import { BrandHeader, Confirm, CountUp, Page, rise, stagger } from '../components/ui'

const ROWS = [
  { to: '/cuenta/reservas', label: 'Mis reservas', Icon: Calendar },
  { to: '/cuenta/pedidos', label: 'Mis pedidos', Icon: Bag },
  { to: '/cuenta/favoritos', label: 'Mis favoritos', Icon: Heart },
  { to: '/cuenta/direcciones', label: 'Mis direcciones', Icon: Pin },
  { to: '/cuenta/pagos', label: 'Métodos de pago', Icon: Card },
  { to: '/cuenta/puntos', label: 'Mis puntos The Meat', Icon: Trophy },
  { to: '/cuenta/notificaciones', label: 'Notificaciones', Icon: Bell },
  { to: '/cuenta/ayuda', label: 'Ayuda y soporte', Icon: Help },
]

export const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join('')

export default function Cuenta() {
  const { user, reservations, dispatch } = useStore()
  const { show } = useToast()
  const nav = useNavigate()
  const [ask, setAsk] = useState(false)
  const level = levelFor(user.points)
  const resCount = reservations.filter((r) => r.status !== 'Cancelada').length

  const logout = () => {
    setAsk(false)
    dispatch({ type: 'session/end' })
    show('Sesión cerrada')
    nav('/', { replace: true })
  }

  return (
    <Page className="cuenta">
      <BrandHeader
        right={
          <Link to="/cuenta/ajustes" className="iconbtn" aria-label="Ajustes">
            <Gear />
          </Link>
        }
      />
      <div className="wrap">
        <motion.div className="profile" variants={stagger(0.05, 0.09)} initial="hidden" animate="show">
          <motion.div variants={rise} className="avatar">
            <span className="avatar__ring" />
            <span className="avatar__initials">{initials(user.name)}</span>
          </motion.div>
          <motion.h1 variants={rise} className="display profile__name">
            {user.name}
          </motion.h1>
          <motion.p variants={rise} className="profile__email">
            {user.email}
          </motion.p>
        </motion.div>

        <motion.div className="stats" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <Link to="/cuenta/reservas" className="stat">
            <span className="stat__num">
              <CountUp to={resCount} />
            </span>
            <span className="stat__label">
              Reservas
              <br />
              realizadas
            </span>
          </Link>
          <Link to="/cuenta/puntos" className="stat">
            <span className="stat__num">
              <CountUp to={user.points} />
            </span>
            <span className="stat__label">
              Puntos
              <br />
              The Meat
            </span>
          </Link>
          <Link to="/cuenta/puntos" className="stat">
            <span className="stat__num stat__num--icon">
              <Flame />
            </span>
            <span className="stat__label">
              Nivel
              <br />
              <b>{level.name}</b>
            </span>
          </Link>
        </motion.div>

        <motion.ul className="rows" variants={stagger(0.4, 0.06)} initial="hidden" animate="show">
          {ROWS.map(({ to, label, Icon }) => (
            <motion.li key={to} variants={rise}>
              <Link to={to} className="row">
                <span className="row__icon">
                  <Icon size={20} />
                </span>
                <span className="row__label">{label}</span>
                <span className="row__chev">
                  <Chevron size={18} />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.5 }} className="cuenta__logout">
          <button type="button" className="btn-outline" onClick={() => setAsk(true)}>
            <Logout size={20} /> Cerrar sesión
          </button>
        </motion.div>
      </div>

      <Confirm open={ask} title="¿Cerrar sesión?" body="Tu pedido en curso se vaciará. Tus reservas y puntos se conservan." confirmLabel="Cerrar sesión" danger onConfirm={logout} onClose={() => setAsk(false)} />
    </Page>
  )
}
