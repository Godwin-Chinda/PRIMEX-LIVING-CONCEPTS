import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import api from '../hooks/useApi';
import './Products.css';

const Reveal = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
};

// Default categories/product list without pricing
const defaultProducts = [
  { _id: 'p1', name: 'Porcelain Floor Tiles', description: 'High-grade porcelain tiles available in a wide range of sizes, finishes, and patterns. Suitable for residential and commercial floors.', category: 'Tiles & Flooring', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { _id: 'p2', name: 'Marble-Effect Wall Tiles', description: 'Premium wall tiles with authentic marble finish. Perfect for bathrooms, kitchens, and feature walls.', category: 'Tiles & Flooring', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80' },
  { _id: 'p3', name: 'Wood-Grain Vinyl Flooring', description: 'Durable, waterproof vinyl planks with realistic wood grain textures. Ideal for bedrooms and living areas.', category: 'Tiles & Flooring', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { _id: 'p4', name: 'Ceramic Bathroom Suite', description: 'Complete sanitary ware packages including toilet WC, hand basin, and cistern. Clean modern designs.', category: 'Sanitary Wares', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
  { _id: 'p5', name: 'Shower Enclosures & Trays', description: 'Frameless and semi-framed shower glass enclosures with matching shower trays in various sizes.', category: 'Sanitary Wares', image: 'https://images.unsplash.com/photo-1620626011761-996317702782?w=600&q=80' },
  { _id: 'p6', name: 'Bathroom Accessories Set', description: 'Coordinated bathroom fittings including towel rails, toilet roll holders, soap dispensers, and mirrors.', category: 'Sanitary Wares', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=600&q=80' },
  { _id: 'p7', name: 'Stone Wall Cladding Panels', description: 'Natural stone-effect wall panels for feature walls, exterior facades, and decorative interior surfaces.', category: 'Wall Cladding', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80' },
  { _id: 'p8', name: 'PVC Wall Panels', description: 'Easy-install PVC panels in a range of textures and colours. Moisture-resistant and low-maintenance.', category: 'Wall Cladding', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
  { _id: 'p9', name: 'Door Handles & Hardware', description: 'Contemporary and classic door handle sets, hinges, locks, and accessories in chrome, gold, and matte black finishes.', category: 'Interior Fittings', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80' },
];

const categories = ['All', 'Tiles & Flooring', 'Sanitary Wares', 'Wall Cladding', 'Interior Fittings'];

const Products = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.get('/products').then(res => {
      if (res.data.products?.length) setProducts(res.data.products);
    }).catch(() => {});
  }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="page-hero-overlay" />
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="Products" className="page-hero-img" />
        <div className="container page-hero-content">
          <motion.span className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Our Catalogue</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.75 }}>
            Premium Building <em>Materials</em>
          </motion.h1>
        </div>
      </section>

      {/* QUOTE NOTE */}
      <div className="quote-notice">
        <div className="container">
          <FiMessageCircle />
          <p>All prices are available on request. <Link to="/contact">Contact us</Link> or call <a href="tel:07042613350">07042613350</a> for a free quotation tailored to your project.</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          {/* TOOLBAR */}
          <div className="products-toolbar">
            <div className="search-box">
              <FiSearch />
              <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="cat-filters">
              {categories.map(cat => (
                <button key={cat} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="products-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</div>

          <div className="products-grid">
            {filtered.map((product, i) => (
              <motion.div key={product._id} className="product-card"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="pc-image">
                  <img src={product.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'}
                    alt={product.name}
                    onError={e => e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'}
                  />
                  {product.category && <span className="pc-badge">{product.category}</span>}
                </div>
                <div className="pc-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="pc-footer">
                    <span className="pc-quote-note">Contact for price</span>
                    <Link to="/contact" className="pc-cta">Get Quote</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <p>No products found. Try a different search or category.</p>
              <button className="btn-outline" onClick={() => { setSearch(''); setActiveCategory('All'); }}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="products-cta-section">
        <div className="container">
          <Reveal className="products-cta-inner">
            <h2>Don't See What You Need?</h2>
            <p>We stock a wide range of products not all listed here. Contact us to discuss your specific requirements and we'll find the right solution for you.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Link to="/contact" className="btn-primary">Contact Us Today</Link>
              <a href="tel:07042613350" className="btn-outline">Call 07042613350</a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Products;
