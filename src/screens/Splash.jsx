import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { A } from '../data'
import { useStore } from '../store'
import { Arrow } from '../icons'
import { EASE, Embers, GoldButton, Page } from '../components/ui'

export default function Splash() {
  const nav = useNavigate()
  const { dispatch } = useStore()
  const reduce = useReducedMotion()

  const start = () => {
    dispatch({ type: 'session/start' })
    nav('/inicio', { replace: true })
  }

  return (
    <Page variant="zoom" noTabs className="splash">
      <motion.img
        src={A('splash-fondo.jpg')}
        alt=""
        className="splash__bg"
        initial={{ scale: 1.12 }}
        animate={{ scale: reduce ? 1.12 : 1 }}
        transition={{ duration: 14, ease: 'linear' }}
      />
      <div className="splash__vignette" />
      <Embers density={48} />
      <motion.img
        src={A('overlay-brasas.png')}
        alt=""
        className="splash__sparks"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: [60, -120], opacity: [0, 0.55, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      <div className="splash__content">
        <motion.div
          className="splash__logo-wrap"
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        >
          <img src={A('logo-completo.png')} alt="The Meat Restaurant" className="splash__logo" />
          <motion.span
            className="splash__shine"
            initial={{ x: '-140%' }}
            animate={{ x: '160%' }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 1.1 }}
          />
        </motion.div>

        <motion.div className="splash__rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: EASE, delay: 1.1 }} />

        <motion.p className="splash__eyebrow" initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={{ opacity: 1, letterSpacing: '0.34em' }} transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}>
          Cortes de carnes
          <br />
          al carbón
        </motion.p>

        <motion.p className="splash__tagline" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 1.6 }}>
          Más que una comida,
          <br />
          una gran experiencia.
        </motion.p>

        <motion.div className="splash__cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 1.95 }}>
          <GoldButton onClick={start} className="btn-gold--lg">
            Comenzar <Arrow size={18} />
          </GoldButton>
        </motion.div>
      </div>
    </Page>
  )
}
