const I = ({ children, size = 22, sw = 1.5, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

export const Home = (p) => (
  <I {...p}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
  </I>
)
export const MenuIcon = (p) => (
  <I {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </I>
)
export const Calendar = (p) => (
  <I {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </I>
)
export const User = (p) => (
  <I {...p}>
    <circle cx="12" cy="8.5" r="3.75" />
    <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </I>
)
export const Cart = (p) => (
  <I {...p}>
    <path d="M3 4h2l2.4 11h11.2L21 7H6.2" />
    <circle cx="9" cy="19.5" r="1.25" />
    <circle cx="17" cy="19.5" r="1.25" />
  </I>
)
export const Heart = ({ filled, ...p }) => (
  <I {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
  </I>
)
export const Back = (p) => (
  <I {...p} sw={1.75}>
    <path d="M15 5l-7 7 7 7" />
  </I>
)
export const Chevron = (p) => (
  <I {...p} sw={1.75}>
    <path d="M9 5l7 7-7 7" />
  </I>
)
export const ChevronDown = (p) => (
  <I {...p} sw={1.75}>
    <path d="M5 9l7 7 7-7" />
  </I>
)
export const Arrow = (p) => (
  <I {...p} sw={1.75}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </I>
)
export const Gear = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </I>
)
export const Clock = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </I>
)
export const Users = (p) => (
  <I {...p}>
    <circle cx="9" cy="8.5" r="3.25" />
    <path d="M2.5 20c1-3.2 3.4-5 6.5-5s5.5 1.8 6.5 5" />
    <path d="M15.5 5.5a3.25 3.25 0 0 1 0 6M17 15.2c2.3.5 3.9 2.1 4.5 4.8" />
  </I>
)
export const Plus = (p) => (
  <I {...p} sw={1.75}>
    <path d="M12 5v14M5 12h14" />
  </I>
)
export const Minus = (p) => (
  <I {...p} sw={1.75}>
    <path d="M5 12h14" />
  </I>
)
export const Check = (p) => (
  <I {...p} sw={2}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </I>
)
export const Close = (p) => (
  <I {...p} sw={1.75}>
    <path d="M6 6l12 12M18 6L6 18" />
  </I>
)
export const Bag = (p) => (
  <I {...p}>
    <path d="M5.5 8h13l-1 12h-11z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </I>
)
export const Pin = (p) => (
  <I {...p}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.25" />
  </I>
)
export const Card = (p) => (
  <I {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 15h4" />
  </I>
)
export const Trophy = (p) => (
  <I {...p}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
    <path d="M8 6H5.5a2.5 2.5 0 0 0 2.5 3M16 6h2.5A2.5 2.5 0 0 1 16 9M12 13v3M8.5 20h7M10 16h4v4h-4z" />
  </I>
)
export const Bell = (p) => (
  <I {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </I>
)
export const Help = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.2M12 17h.01" />
  </I>
)
export const Logout = (p) => (
  <I {...p}>
    <path d="M10 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h4M15 8l4 4-4 4M19 12H9.5" />
  </I>
)
export const Flame = (p) => (
  <I {...p}>
    <path d="M12 3c.5 3 3 4.5 3 8a3 3 0 0 1-6 0c0-1 .5-2 1-2.5.2 1 .8 1.5 1.5 1.5C12 8 10 6 12 3z" />
    <path d="M7 13.5c-.6 1-1 2.1-1 3.2A6 6 0 0 0 18 17c0-1.2-.4-2.4-1-3.4" />
  </I>
)
export const Star = (p) => (
  <I {...p}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8z" />
  </I>
)
export const Trash = (p) => (
  <I {...p}>
    <path d="M5 7h14M9 7V5h6v2M8 7l.7 12h6.6L16 7" />
  </I>
)
export const Edit = (p) => (
  <I {...p}>
    <path d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.1l-1.9-1.9a1.5 1.5 0 0 0-2.1 0L4 16z" />
  </I>
)
export const Mail = (p) => (
  <I {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </I>
)
export const Phone = (p) => (
  <I {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />
  </I>
)
export const Chat = (p) => (
  <I {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V16A2.5 2.5 0 0 1 4 13.5z" />
  </I>
)
export const Globe = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" />
  </I>
)
export const Moon = (p) => (
  <I {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </I>
)

// Category glyphs — line art, drawn to sit inside a gold ring
export const Steak = (p) => (
  <I {...p} size={p.size ?? 26} sw={1.4}>
    <path d="M6.5 6.5c2.8-1.6 6.2-1.2 8.4.8 2.3 2 2.5 5.2.6 7.6-1.9 2.4-5.2 3.4-8 2.2-2.8-1.3-3.9-4.4-3-7.2.3-1.3.9-2.6 2-3.4z" />
    <path d="M9 10.5c1-.6 2.2-.4 2.9.4.8.8.8 2 0 2.8" />
    <path d="M15.5 4.5c1.4-.4 2.6.4 2.6 1.6 0 1.1-1 1.7-2 1.6" />
  </I>
)
export const Burger = (p) => (
  <I {...p} size={p.size ?? 26} sw={1.4}>
    <path d="M5 10c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5z" />
    <path d="M4 13h16" />
    <path d="M5.5 16c0 2 2.5 3.5 6.5 3.5s6.5-1.5 6.5-3.5z" />
    <path d="M9 7.5h.01M12 7h.01M15 7.5h.01" />
  </I>
)
export const Bowl = (p) => (
  <I {...p} size={p.size ?? 26} sw={1.4}>
    <path d="M4 11.5h16c0 4.5-3.2 7.5-8 7.5s-8-3-8-7.5z" />
    <path d="M9 8.5c0-1.5.8-2.3 1.8-3M13 8.5c0-1.5.8-2.3 1.8-3" />
  </I>
)
export const Fries = (p) => (
  <I {...p} size={p.size ?? 26} sw={1.4}>
    <path d="M6.5 10.5l1.2 9h8.6l1.2-9" />
    <path d="M9.5 10.5V5.5M12 10.5V4.5M14.5 10.5V5.5" />
    <path d="M5.5 10.5h13" />
  </I>
)
export const Cake = (p) => (
  <I {...p} size={p.size ?? 26} sw={1.4}>
    <path d="M5 12.5h14v6.5H5z" />
    <path d="M5 15c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0" />
    <path d="M7 12.5V10a1.5 1.5 0 0 1 3 0M11 12.5V9a1 1 0 0 1 2 0v3.5M14 12.5V10a1.5 1.5 0 0 1 3 0" />
  </I>
)

export const CategoryGlyph = ({ name, ...p }) =>
  ({ steak: <Steak {...p} />, burger: <Burger {...p} />, bowl: <Bowl {...p} />, fries: <Fries {...p} />, flame: <Flame {...p} size={p.size ?? 26} sw={1.4} />, cake: <Cake {...p} /> })[name] ?? null
