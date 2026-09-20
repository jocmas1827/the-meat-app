import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { A, CATEGORIES, byCat, catById } from '../data'
import { Chevron } from '../icons'
import { BrandHeader, CartButton, Page, ProductCard, SubHeader, rise, stagger } from '../components/ui'

export function Menu() {
  return (
    <Page className="menu">
      <BrandHeader right={<CartButton />} />
      <div className="wrap">
        <motion.div variants={stagger(0.05, 0.08)} initial="hidden" animate="show">
          <motion.h1 variants={rise} className="display title">
            Nuestro Menú
          </motion.h1>
          <motion.p variants={rise} className="lead lead--muted">
            Una experiencia completa, del carbón a tu mesa.
          </motion.p>
        </motion.div>

        <motion.ul className="catlist" variants={stagger(0.2, 0.08)} initial="hidden" animate="show">
          {CATEGORIES.map((c) => (
            <motion.li key={c.id} variants={rise}>
              <Link to={`/menu/${c.id}`} className="catrow">
                <span className="catrow__thumb">
                  <img src={A(c.image)} alt="" loading="lazy" />
                </span>
                <span className="catrow__text">
                  <span className="catrow__name">{c.name}</span>
                  <span className="catrow__tag">{c.tagline}</span>
                </span>
                <span className="catrow__chev">
                  <Chevron size={20} />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Page>
  )
}

export function Category() {
  const { cat } = useParams()
  const c = catById(cat)
  if (!c) return <Navigate to="/menu" replace />
  const items = byCat(cat)
  return (
    <Page variant="push" className="category">
      <SubHeader title={c.name} fallback="/menu" right={<CartButton />} />
      <div className="wrap">
        <div className="cathero">
          <img src={A(c.image)} alt="" className="cathero__img" />
          <div className="cathero__grad" />
          <div className="cathero__copy">
            <span className="eyebrow">{c.tagline}</span>
            <span className="cathero__count">
              {items.length} {items.length === 1 ? 'plato' : 'platos'}
            </span>
          </div>
        </div>
        <motion.div className="grid2" variants={stagger(0.15, 0.08)} initial="hidden" animate="show">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </motion.div>
      </div>
    </Page>
  )
}
