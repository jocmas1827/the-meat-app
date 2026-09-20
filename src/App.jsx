import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { StoreProvider, ToastProvider, useStore } from './store'
import { AU } from './data'
import { TabBar, ToastHost, navHistory } from './components/ui'
import Splash from './screens/Splash'
import Home from './screens/Home'
import { Category, Menu } from './screens/Menu'
import Product from './screens/Product'
import Cart from './screens/Cart'
import Reservas from './screens/Reservas'
import Cuenta from './screens/Cuenta'
import { Ajustes, Ayuda, Direcciones, Favoritos, MisPedidos, MisReservas, Notificaciones, Pagos, Puntos } from './screens/CuentaSub'

function Gate({ children }) {
  const { started } = useStore()
  return started ? children : <Navigate to="/" replace />
}

function Screens() {
  const location = useLocation()
  const { started } = useStore()
  const isSplash = location.pathname === '/'
  useEffect(() => {
    navHistory.count += 1
  }, [location.key])
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={started ? <Navigate to="/inicio" replace /> : <Splash />} />
          <Route path="/inicio" element={<Gate><Home /></Gate>} />
          <Route path="/menu" element={<Gate><Menu /></Gate>} />
          <Route path="/menu/:cat" element={<Gate><Category /></Gate>} />
          <Route path="/producto/:id" element={<Gate><Product /></Gate>} />
          <Route path="/pedido" element={<Gate><Cart /></Gate>} />
          <Route path="/reservas" element={<Gate><Reservas /></Gate>} />
          <Route path="/cuenta" element={<Gate><Cuenta /></Gate>} />
          <Route path="/cuenta/reservas" element={<Gate><MisReservas /></Gate>} />
          <Route path="/cuenta/pedidos" element={<Gate><MisPedidos /></Gate>} />
          <Route path="/cuenta/favoritos" element={<Gate><Favoritos /></Gate>} />
          <Route path="/cuenta/direcciones" element={<Gate><Direcciones /></Gate>} />
          <Route path="/cuenta/pagos" element={<Gate><Pagos /></Gate>} />
          <Route path="/cuenta/puntos" element={<Gate><Puntos /></Gate>} />
          <Route path="/cuenta/notificaciones" element={<Gate><Notificaciones /></Gate>} />
          <Route path="/cuenta/ayuda" element={<Gate><Ayuda /></Gate>} />
          <Route path="/cuenta/ajustes" element={<Gate><Ajustes /></Gate>} />
          <Route path="*" element={<Navigate to={started ? '/inicio' : '/'} replace />} />
        </Routes>
      </AnimatePresence>
      {!isSplash && started && <TabBar />}
      <ToastHost />
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <HashRouter>
          <div className="stage" style={{ '--tex': `url(${AU('textura-carbon.jpg')})` }}>
            <div className="device" id="device">
              <Screens />
            </div>
          </div>
        </HashRouter>
      </ToastProvider>
    </StoreProvider>
  )
}
