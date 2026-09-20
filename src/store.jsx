import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { SEED, byId, toISO } from './data'

const KEY = 'themeat:v1'
const Ctx = createContext(null)
const ToastCtx = createContext(null)

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return SEED
    const saved = JSON.parse(raw)
    return { ...SEED, ...saved, user: { ...SEED.user, ...saved.user }, notifications: { ...SEED.notifications, ...saved.notifications } }
  } catch {
    return SEED
  }
}

const uid = (p) => `${p}-${Math.floor(1000 + Math.random() * 9000)}`

function reducer(s, a) {
  switch (a.type) {
    case 'session/start':
      return { ...s, started: true }
    case 'session/end':
      return { ...s, started: false, cart: [] }

    case 'cart/add': {
      const ex = s.cart.find((i) => i.key === a.item.key)
      const cart = ex
        ? s.cart.map((i) => (i.key === a.item.key ? { ...i, qty: i.qty + a.item.qty } : i))
        : [...s.cart, a.item]
      return { ...s, cart }
    }
    case 'cart/qty': {
      const cart = s.cart.map((i) => (i.key === a.key ? { ...i, qty: a.qty } : i)).filter((i) => i.qty > 0)
      return { ...s, cart }
    }
    case 'cart/remove':
      return { ...s, cart: s.cart.filter((i) => i.key !== a.key) }
    case 'cart/clear':
      return { ...s, cart: [] }

    case 'fav/toggle': {
      const has = s.favorites.includes(a.id)
      return { ...s, favorites: has ? s.favorites.filter((x) => x !== a.id) : [a.id, ...s.favorites] }
    }

    case 'order/place': {
      const earned = Math.round(a.total / 1000)
      const order = {
        id: uid('TM'),
        date: toISO(new Date()),
        status: 'En preparación',
        total: a.total,
        mode: a.mode,
        items: s.cart.map((i) => ({ name: byId(i.productId)?.name ?? i.productId, qty: i.qty, note: i.summary })),
      }
      return { ...s, cart: [], orders: [order, ...s.orders], user: { ...s.user, points: s.user.points + earned } }
    }

    case 'res/add': {
      const r = { id: uid('R'), status: 'Confirmada', ...a.res }
      return { ...s, reservations: [r, ...s.reservations] }
    }
    case 'res/cancel':
      return { ...s, reservations: s.reservations.map((r) => (r.id === a.id ? { ...r, status: 'Cancelada' } : r)) }

    case 'addr/add': {
      const addr = { id: uid('a'), isDefault: s.addresses.length === 0, ...a.addr }
      return { ...s, addresses: [...s.addresses, addr] }
    }
    case 'addr/remove': {
      const rest = s.addresses.filter((x) => x.id !== a.id)
      if (rest.length && !rest.some((x) => x.isDefault)) rest[0] = { ...rest[0], isDefault: true }
      return { ...s, addresses: rest }
    }
    case 'addr/default':
      return { ...s, addresses: s.addresses.map((x) => ({ ...x, isDefault: x.id === a.id })) }

    case 'pay/default':
      return { ...s, payments: s.payments.map((x) => ({ ...x, isDefault: x.id === a.id })) }

    case 'notif/toggle':
      return { ...s, notifications: { ...s.notifications, [a.key]: !s.notifications[a.key] } }

    case 'user/update':
      return { ...s, user: { ...s.user, ...a.patch } }

    default:
      return s
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, load)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  const cartCount = useMemo(() => state.cart.reduce((n, i) => n + i.qty, 0), [state.cart])
  const cartTotal = useMemo(() => state.cart.reduce((n, i) => n + i.unit * i.qty, 0), [state.cart])

  const value = useMemo(() => ({ ...state, dispatch, cartCount, cartTotal }), [state, cartCount, cartTotal])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  const show = useCallback((msg, opts = {}) => {
    clearTimeout(timer.current)
    setToast({ id: Date.now(), msg, ...opts })
    timer.current = setTimeout(() => setToast(null), opts.duration ?? 2200)
  }, [])
  const value = useMemo(() => ({ toast, show }), [toast, show])
  return <ToastCtx.Provider value={value}>{children}</ToastCtx.Provider>
}

export const useToast = () => useContext(ToastCtx)
