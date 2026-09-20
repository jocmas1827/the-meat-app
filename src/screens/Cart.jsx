import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { A, byId, money } from '../data'
import { useStore, useToast } from '../store'
import { Trash } from '../icons'
import { EASE, Empty, GhostButton, GoldButton, Page, Stepper, SubHeader, SuccessOverlay, Toggle, rise, stagger } from '../components/ui'

export default function Cart() {
  const { cart, cartTotal, addresses, dispatch } = useStore()
  const { show } = useToast()
  const nav = useNavigate()
  const [tip, setTip] = useState(true)
  const [mode, setMode] = useState('mesa')
  const [done, setDone] = useState(null)

  const tipAmt = tip ? Math.round(cartTotal * 0.1) : 0
  const delivery = mode === 'domicilio' ? 8000 : 0
  const total = cartTotal + tipAmt + delivery
  const addr = addresses.find((a) => a.isDefault)

  const confirm = () => {
    const earned = Math.round(total / 1000)
    dispatch({ type: 'order/place', total, mode })
    setDone({ total, earned, mode })
  }

  return (
    <Page variant="push" className="cart">
      <SubHeader title="Tu pedido" backTo={cart.length ? undefined : '/menu'} right={cart.length > 0 && (
        <button type="button" className="iconbtn" aria-label="Vaciar pedido" onClick={() => { dispatch({ type: 'cart/clear' }); show('Pedido vaciado') }}>
          <Trash />
        </button>
      )} />

      {cart.length === 0 && !done ? (
        <Empty
          title="Tu pedido está vacío"
          body="Explora nuestros cortes al carbón y arma tu pedido."
          action={
            <GoldButton as={Link} to="/menu" className="btn-gold--md">
              Explorar menú
            </GoldButton>
          }
        />
      ) : (
        <div className="wrap">
          <motion.ul className="cartlist" variants={stagger(0.05, 0.07)} initial="hidden" animate="show">
            <AnimatePresence initial={false}>
              {cart.map((i) => {
                const p = byId(i.productId)
                return (
                  <motion.li key={i.key} className="cartitem" variants={rise} layout exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0, transition: { duration: 0.25 } }}>
                    <Link to={`/producto/${p.id}`} className="cartitem__thumb">
                      <img src={A(p.image)} alt="" />
                    </Link>
                    <div className="cartitem__body">
                      <span className="cartitem__name">{p.name}</span>
                      {i.summary && <span className="cartitem__note">{i.summary}</span>}
                      <div className="cartitem__row">
                        <Stepper size="sm" value={i.qty} min={0} onChange={(q) => dispatch({ type: 'cart/qty', key: i.key, qty: q })} />
                        <span className="cartitem__price">{money(i.unit * i.qty)}</span>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>

          <motion.section className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5, ease: EASE }}>
            <h3 className="h3">¿Cómo lo quieres?</h3>
            <div className="seg" role="radiogroup" aria-label="Modalidad">
              {[
                ['mesa', 'En mesa'],
                ['recoger', 'Para recoger'],
                ['domicilio', 'A domicilio'],
              ].map(([v, l]) => (
                <button key={v} type="button" role="radio" aria-checked={mode === v} className={`seg__btn ${mode === v ? 'is-on' : ''}`} onClick={() => setMode(v)}>
                  <span className="seg__bg" />
                  <span className="seg__label">{l}</span>
                </button>
              ))}
            </div>
            <AnimatePresence initial={false}>
              {mode === 'domicilio' && (
                <motion.div className="addrline" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                  {addr ? (
                    <>
                      <span>
                        <b>{addr.label}</b> · {addr.line}, {addr.city}
                      </span>
                      <Link to="/cuenta/direcciones" className="textlink textlink--sm">
                        Cambiar
                      </Link>
                    </>
                  ) : (
                    <Link to="/cuenta/direcciones" className="textlink textlink--sm">
                      Agregar dirección de entrega
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          <motion.section className="card totals" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5, ease: EASE }}>
            <div className="totals__row">
              <span>Subtotal</span>
              <span>{money(cartTotal)}</span>
            </div>
            <div className="totals__row">
              <span className="totals__tip">
                Propina voluntaria (10%)
                <Toggle id="tip" label="Propina voluntaria" checked={tip} onChange={setTip} />
              </span>
              <span>{money(tipAmt)}</span>
            </div>
            {delivery > 0 && (
              <div className="totals__row">
                <span>Domicilio</span>
                <span>{money(delivery)}</span>
              </div>
            )}
            <div className="totals__row totals__row--total">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
            <p className="totals__pts">Acumulas {Math.round(total / 1000)} puntos The Meat con este pedido.</p>
          </motion.section>

          <div className="cart__cta">
            <GoldButton onClick={confirm} className="btn-gold--block">
              Confirmar pedido · {money(total)}
            </GoldButton>
          </div>
        </div>
      )}

      <SuccessOverlay
        open={!!done}
        eyebrow="Pedido confirmado"
        title="¡A la brasa!"
        lines={done ? [
          done.mode === 'mesa' ? 'Tu pedido llegará a la mesa en 20–25 minutos.' : done.mode === 'recoger' ? 'Tu pedido estará listo para recoger en 25 minutos.' : 'Tu pedido llegará a tu dirección en 40–50 minutos.',
          `Total ${money(done.total)} · +${done.earned} puntos The Meat`,
        ] : []}
        primary={<GoldButton onClick={() => nav('/cuenta/pedidos', { replace: true })} className="btn-gold--block">Ver mis pedidos</GoldButton>}
        secondary={<GhostButton onClick={() => nav('/inicio', { replace: true })}>Volver al inicio</GhostButton>}
      />
    </Page>
  )
}
