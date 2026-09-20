export const A = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export const CATEGORIES = [
  { id: 'entradas', name: 'Entradas', tagline: 'El inicio perfecto.', image: 'cat-entradas.jpg', icon: 'bowl' },
  { id: 'cortes', name: 'Nuestros Cortes', short: 'Cortes', tagline: 'La esencia de The Meat.', image: 'cat-cortes.jpg', icon: 'steak' },
  { id: 'hamburguesas', name: 'Hamburguesas', tagline: 'Creatividad al carbón.', image: 'cat-hamburguesas.jpg', icon: 'burger' },
  { id: 'acompanantes', name: 'Acompañantes', tagline: 'El complemento ideal.', image: 'cat-acompanantes.jpg', icon: 'fries' },
  { id: 'especialidades', name: 'Especialidades', tagline: 'Platos que sorprenden.', image: 'cat-especialidades.jpg', icon: 'flame' },
  { id: 'postres', name: 'Postres', tagline: 'El final perfecto.', image: 'cat-postres.jpg', icon: 'cake' },
]

export const TERMS = ['Azul', 'Rojo', 'Medio Rojo', 'Medio', 'Tres Cuartos', 'Bien Cocido']
export const SIDES = ['Papas Fritas Originales', 'Papas Rústicas', 'Aros de Cebolla', 'Ensalada Fresca']

const term = { kind: 'term', label: 'Selecciona el término', default: 'Medio Rojo' }
const burger = {
  kind: 'burger',
  label: 'Personaliza tu orden',
  side: SIDES[0],
  extras: [
    { id: 'tocineta', name: 'Extra tocineta', price: 6000 },
    { id: 'queso', name: 'Extra queso', price: 4000 },
  ],
}

export const PRODUCTS = [
  {
    id: 'ribeye', cat: 'cortes', name: 'Ribeye 350 gr', tag: 'Nacional Premium', price: 89000, best: true, image: 'prod-ribeye.jpg',
    desc: 'Corte jugoso y altamente marmoleado, con un sabor intenso y una textura inigualable. Parrillado al carbón para resaltar todo su carácter.',
    options: term,
  },
  {
    id: 'tomahawk', cat: 'cortes', name: 'Tomahawk 400 gr', tag: 'Corte de autor', price: 128000, image: 'prod-tomahawk.jpg',
    desc: 'Imponente corte con hueso largo que conserva toda la jugosidad. Sellado a fuego vivo y terminado lento sobre brasas de carbón.',
    options: term,
  },
  {
    id: 'picana', cat: 'cortes', name: 'Picaña 300 gr', tag: 'Clásico de la casa', price: 72000, image: 'prod-picana.jpg',
    desc: 'La capa de grasa dorada al carbón perfuma cada medallón. Un clásico de la parrilla que nunca decepciona.',
    options: term,
  },
  {
    id: 'lomo', cat: 'cortes', name: 'Lomo Fino 280 gr', tag: 'Nacional Premium', price: 78000, image: 'prod-lomo.jpg',
    desc: 'El corte más tierno de la res. Suave, magro y con un sellado profundo que concentra todo su sabor.',
    options: term,
  },
  {
    id: 'newyork', cat: 'cortes', name: 'New York Strip 350 gr', tag: 'Importado', price: 96000, image: 'prod-newyork.jpg',
    desc: 'Equilibrio perfecto entre marmoleo y firmeza. Un corte con carácter, ideal para quienes buscan intensidad.',
    options: term,
  },
  {
    id: 'angus-trufada', cat: 'hamburguesas', name: 'The Meat Angus Trufada', tag: 'Hamburguesas', price: 46000, best: true, image: 'prod-angus-trufada.jpg',
    desc: 'Carne de res angus, aderezo blue cheese, champiñones, tocineta y toque trufado. Acompañada con papas fritas.',
    options: burger,
  },
  {
    id: 'burger-clasica', cat: 'hamburguesas', name: 'La Clásica al Carbón', tag: 'Hamburguesas', price: 38000, image: 'prod-burger-clasica.jpg',
    desc: 'Carne de res madurada, queso cheddar fundido, lechuga, tomate y cebolla morada en pan brioche tostado. Acompañada con papas fritas.',
    options: burger,
  },
  {
    id: 'carpaccio', cat: 'entradas', name: 'Carpaccio de Res', tag: 'Entradas', price: 34000, image: 'cat-entradas.jpg',
    desc: 'Finas láminas de lomo, rúgula fresca, parmesano y alcaparras con un hilo de aceite de oliva.',
  },
  {
    id: 'provoleta', cat: 'entradas', name: 'Provoleta a la Parrilla', tag: 'Entradas', price: 32000, best: true, image: 'prod-provoleta.jpg',
    desc: 'Queso provolone dorado sobre las brasas, con orégano, tomates confitados y pan artesanal.',
  },
  {
    id: 'chorizo', cat: 'entradas', name: 'Chorizo Argentino', tag: 'Entradas', price: 24000, image: 'prod-chorizo.jpg',
    desc: 'Chorizo artesanal a la brasa con chimichurri de la casa y pan de campo.',
  },
  {
    id: 'papas', cat: 'acompanantes', name: 'Papas Fritas Originales', tag: 'Acompañantes', price: 14000, image: 'prod-papas.jpg',
    desc: 'Corte grueso, doble fritura y sal marina. Crocantes por fuera, suaves por dentro.',
  },
  {
    id: 'pure-trufado', cat: 'acompanantes', name: 'Puré Trufado', tag: 'Acompañantes', price: 16000, best: true, image: 'prod-pure-trufado.jpg',
    desc: 'Puré de papa cremoso con mantequilla y aceite de trufa negra.',
  },
  {
    id: 'ensalada', cat: 'acompanantes', name: 'Ensalada de la Casa', tag: 'Acompañantes', price: 18000, image: 'prod-ensalada.jpg',
    desc: 'Mezcla de hojas verdes, tomate cherry, parmesano y vinagreta de la casa.',
  },
  {
    id: 'camarones', cat: 'especialidades', name: 'Camarones al Ajillo', tag: 'Especialidades', price: 58000, best: true, image: 'cat-especialidades.jpg',
    desc: 'Camarones jumbo salteados en mantequilla de ajo y un toque de vino blanco.',
  },
  {
    id: 'costillas', cat: 'especialidades', name: 'Costillas BBQ Ahumadas', tag: 'Especialidades', price: 64000, image: 'cat-cortes.jpg',
    desc: 'Costillas de res ahumadas por horas, glaseadas con nuestra salsa BBQ de la casa.',
  },
  {
    id: 'brownie', cat: 'postres', name: 'Volcán de Chocolate', tag: 'Postres', price: 22000, best: true, image: 'prod-brownie.jpg',
    desc: 'Bizcocho tibio de chocolate con centro fundido y helado de vainilla.',
  },
  {
    id: 'cheesecake', cat: 'postres', name: 'Cheesecake de la Casa', tag: 'Postres', price: 20000, image: 'prod-cheesecake.jpg',
    desc: 'Cremoso, con base de galleta y coulis de frutos rojos.',
  },
  {
    id: 'torta-chocolate', cat: 'postres', name: 'Torta de Chocolate', tag: 'Postres', price: 18000, image: 'cat-postres.jpg',
    desc: 'Capas húmedas de chocolate oscuro con ganache brillante.',
  },
]

export const byId = (id) => PRODUCTS.find((p) => p.id === id)
export const byCat = (cat) => PRODUCTS.filter((p) => p.cat === cat)
export const catById = (id) => CATEGORIES.find((c) => c.id === id)

const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
export const money = (n) => fmt.format(n).replace(/\s/g, ' ')

export const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
export const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
export const fmtDate = (iso) => {
  const d = new Date(iso + 'T12:00:00')
  return `${DAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`
}
export const fmtDateShort = (iso) => {
  const d = new Date(iso + 'T12:00:00')
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
export const toISO = (d) => {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
export const nextDays = (n = 30) => {
  const out = []
  const t = new Date()
  for (let i = 0; i < n; i++) {
    const d = new Date(t)
    d.setDate(t.getDate() + i)
    out.push(toISO(d))
  }
  return out
}
export const HOURS = []
for (let h = 12; h <= 22; h++) {
  for (const m of ['00', '30']) {
    if (h === 22 && m === '30') continue
    const hh = h > 12 ? h - 12 : h
    HOURS.push(`${hh}:${m} ${h >= 12 ? 'PM' : 'AM'}`)
  }
}

export const LEVELS = [
  { name: 'Aprendiz', min: 0 },
  { name: 'Parrillero', min: 200 },
  { name: 'Maestro', min: 1000 },
  { name: 'Leyenda', min: 2500 },
]
export const levelFor = (pts) => [...LEVELS].reverse().find((l) => pts >= l.min)
export const nextLevel = (pts) => LEVELS.find((l) => l.min > pts)

export const SEED = {
  started: false,
  user: { name: 'Juan Delgado', email: 'juan.delgado@gmail.com', points: 320 },
  cart: [],
  favorites: ['ribeye', 'angus-trufada'],
  orders: [
    {
      id: 'TM-1042', date: '2026-09-06', status: 'Entregado', total: 135000,
      items: [{ name: 'Ribeye 350 gr', qty: 1, note: 'Medio Rojo' }, { name: 'The Meat Angus Trufada', qty: 1, note: 'Papas Fritas Originales' }],
    },
    {
      id: 'TM-0987', date: '2026-08-22', status: 'Entregado', total: 94000,
      items: [{ name: 'Picaña 300 gr', qty: 1, note: 'Medio' }, { name: 'Volcán de Chocolate', qty: 1 }],
    },
  ],
  reservations: [
    { id: 'R-2061', date: '2026-09-26', time: '8:00 PM', people: 2, status: 'Confirmada' },
    { id: 'R-2033', date: '2026-09-06', time: '7:30 PM', people: 4, status: 'Completada' },
    { id: 'R-1998', date: '2026-08-22', time: '1:00 PM', people: 2, status: 'Completada' },
    { id: 'R-1950', date: '2026-08-02', time: '8:30 PM', people: 6, status: 'Completada' },
    { id: 'R-1902', date: '2026-07-12', time: '7:00 PM', people: 2, status: 'Completada' },
  ],
  addresses: [
    { id: 'a1', label: 'Casa', line: 'Cra 15 # 93-47, Apto 502', city: 'Bogotá', isDefault: true },
    { id: 'a2', label: 'Oficina', line: 'Calle 100 # 8A-49, Piso 9', city: 'Bogotá', isDefault: false },
  ],
  payments: [
    { id: 'p1', brand: 'Visa', last4: '4242', exp: '08/28', isDefault: true },
    { id: 'p2', brand: 'Mastercard', last4: '8810', exp: '02/27', isDefault: false },
  ],
  notifications: { reservas: true, pedidos: true, promociones: false, novedades: true },
}
