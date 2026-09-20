import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { A, CATEGORIES, PRODUCTS, byCat } from '../data'
import { Arrow } from '../icons'
import { CategoryGlyph } from '../icons'
import { BrandHeader, CartButton, EASE, Page, ProductCard, Smoke, rise, stagger } from '../components/ui'

const SLIDES = [
  { eyebrow: 'Nuestros Cortes', title: ['El fuego', 'nos define'], lead: 'Cortes premium, sabor inigualable.', cta: 'Ver menú', to: '/menu/cortes', image: 'home-hero.jpg' },
  { eyebrow: 'Reserva tu mesa', title: ['Grandes momentos', 'a la mesa'], lead: 'Buena comida, mejor compañía.', cta: 'Reservar', to: '/reservas', image: 'reservas-interior.jpg' },
  { eyebrow: 'Hamburguesas', title: ['Creatividad', 'al carbón'], lead: 'Angus, trufa y brasa en cada bocado.', cta: 'Descubrir', to: '/menu/hamburguesas', image: 'prod-angus-trufada.jpg' },
]

const QUICK = ['cortes', 'hamburguesas', 'entradas', 'acompanantes']

export default function Home() {
  const pageRef = useRef(null)
  const { scrollY } = useScroll({ container: pageRef })
  const heroY = useTransform(scrollY, [0, 320], [0, 90])
  const heroScale = useTransform(scrollY, [0, 320], [1, 1.12])
  const reduce = useReducedMotion()

  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const timer = useRef(null)
  const go = (n) => {
    setDir(n > i || (i === SLIDES.length - 1 && n === 0) ? 1 : -1)
    setI(((n % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }
  useEffect(() => {
    if (reduce) return
    timer.current = setInterval(() => {
      setDir(1)
      setI((v) => (v + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(timer.current)
  }, [i, reduce])

  const slide = SLIDES[i]
  const featured = byCat('cortes').slice(0, 4)
  const burgers = byCat('hamburguesas')
  const bests = PRODUCTS.filter((p) => p.best && p.cat !== 'cortes' && p.cat !== 'hamburguesas')

  return (
    <Page ref={pageRef} className="home">
      <BrandHeader right={<CartButton />} />

      <section className="hero" aria-roledescription="carrusel">
        <motion.div className="hero__media" style={{ y: reduce ? 0 : heroY, scale: reduce ? 1 : heroScale }}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={slide.image}
              src={A(slide.image)}
              alt=""
              custom={dir}
              initial={{ opacity: 0, scale: 1.06, x: dir * 28 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.02, x: dir * -20 }}
              transition={{ duration: 0.9, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) go(i + 1)
                else if (info.offset.x > 50) go(i - 1)
              }}
            />
          </AnimatePresence>
        </motion.div>
        <Smoke opacity={0.1} />
        <div className="hero__grad" />

        <div className="hero__copy">
          <AnimatePresence mode="wait">
            <motion.div key={i} variants={stagger(0.1, 0.09)} initial="hidden" animate="show" exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}>
              <motion.span variants={rise} className="eyebrow">
                {slide.eyebrow}
              </motion.span>
              <motion.h1 variants={rise} className="display hero__title">
                {slide.title[0]}
                <br />
                {slide.title[1]}
              </motion.h1>
              <motion.p variants={rise} className="lead">
                {slide.lead}
              </motion.p>
              <motion.div variants={rise}>
                <Link to={slide.to} className="textlink">
                  {slide.cta} <Arrow size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero__dots" role="tablist" aria-label="Diapositivas">
          {SLIDES.map((_, n) => (
            <button key={n} type="button" role="tab" aria-selected={n === i} aria-label={`Diapositiva ${n + 1}`} className={`hero__dot ${n === i ? 'is-active' : ''}`} onClick={() => go(n)}>
              {n === i && !reduce && <motion.span className="hero__dot-fill" key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5.5, ease: 'linear' }} />}
            </button>
          ))}
        </div>
      </section>

      <motion.section className="quick" variants={stagger(0.25, 0.08)} initial="hidden" animate="show">
        {QUICK.map((id) => {
          const c = CATEGORIES.find((x) => x.id === id)
          return (
            <motion.div key={id} variants={rise}>
              <Link to={`/menu/${id}`} className={`quick__item ${id === 'cortes' ? 'is-hot' : ''}`}>
                <span className="quick__ring">
                  <CategoryGlyph name={c.icon} />
                </span>
                <span className="quick__label">{c.short ?? c.name}</span>
              </Link>
            </motion.div>
          )
        })}
      </motion.section>

      <section className="section">
        <div className="section__head">
          <h2 className="h2">Cortes destacados</h2>
          <Link to="/menu/cortes" className="textlink textlink--sm">
            Ver todos <Arrow size={14} />
          </Link>
        </div>
        <motion.div className="hscroll" variants={stagger(0.35, 0.09)} initial="hidden" animate="show">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} variant="wide" />
          ))}
        </motion.div>
      </section>

      <motion.section className="section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ root: pageRef, once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}>
        <Link to="/reservas" className="banner">
          <img src={A('reservas-interior.jpg')} alt="" className="banner__img" />
          <div className="banner__grad" />
          <div className="banner__copy">
            <span className="eyebrow">Reserva tu mesa</span>
            <span className="display banner__title">Grandes momentos a la mesa</span>
            <span className="textlink">
              Reservar ahora <Arrow size={16} />
            </span>
          </div>
        </Link>
      </motion.section>

      <section className="section">
        <div className="section__head">
          <h2 className="h2">Creatividad al carbón</h2>
          <Link to="/menu/hamburguesas" className="textlink textlink--sm">
            Ver todas <Arrow size={14} />
          </Link>
        </div>
        <motion.div className="grid2" variants={stagger(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ root: pageRef, once: true, amount: 0.2 }}>
          {burgers.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </motion.div>
      </section>

      <section className="section section--last">
        <div className="section__head">
          <h2 className="h2">Favoritos de la casa</h2>
          <Link to="/menu" className="textlink textlink--sm">
            Ver menú <Arrow size={14} />
          </Link>
        </div>
        <motion.div className="hscroll" variants={stagger(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ root: pageRef, once: true, amount: 0.2 }}>
          {bests.map((p) => (
            <ProductCard key={p.id} p={p} variant="wide" />
          ))}
        </motion.div>
      </section>
    </Page>
  )
}
