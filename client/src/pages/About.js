import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheckCircle, FiUsers, FiTarget, FiHeart, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import './About.css';

const Reveal = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
};

const values = [
  { icon: <FiCheckCircle />, title: 'Quality First', desc: 'Every product we stock is selected for durability, finish, and long-term performance in real-world conditions.' },
  { icon: <FiUsers />, title: 'Client-Centered', desc: 'We listen to your needs and provide practical, budget-conscious solutions without compromising on quality.' },
  { icon: <FiTarget />, title: 'Reliable Supply', desc: 'Consistent stock availability means your projects never stall. We pride ourselves on dependable delivery.' },
  { icon: <FiHeart />, title: 'Honest Service', desc: 'We build long-term relationships based on transparency, fair pricing, and honest professional advice.' },
  { icon: <FiTrendingUp />, title: 'Growing Together', desc: 'As Abuja grows, we grow with it — continuously expanding our product range to meet evolving market needs.' },
  { icon: <FiGlobe />, title: 'Nigerian Pride', desc: 'We are committed to contributing to a Nigeria where beautiful, quality interiors are accessible to everyone.' },
];

const About = () => (
  <PageTransition>
    <section className="page-hero">
      <div className="page-hero-overlay" />
      <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80" alt="About Primex" className="page-hero-img" />
      <div className="container page-hero-content">
        <motion.span className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Who We Are</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.75 }}>
          Abuja's Trusted<br /><em>Interior Materials Partner</em>
        </motion.h1>
      </div>
    </section>

    {/* STORY */}
    <section className="section-padding">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-text">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">Founded on Quality, Built on Trust</h2>
            <div className="divider" />
            <p>Primex Living Concepts was established with a clear purpose: to give contractors, homeowners, and businesses in Abuja access to high-quality interior building materials at fair, competitive prices.</p>
            <p style={{ marginTop: '1rem' }}>We understand what it takes to complete a project on time and within budget. That is why we stock a wide range of premium tiles, sanitary wares, wall cladding, interior fittings, and finishing solutions — all carefully sourced and quality-checked before they reach our customers.</p>
            <p style={{ marginTop: '1rem' }}>Based in Abuja and serving clients across Nigeria, we are committed to building lasting relationships with everyone who walks through our door. Whether you are finishing a single room or fitting out a commercial complex, Primex is the partner you can count on.</p>
          </Reveal>
          <Reveal delay={0.2} className="about-image-wrap">
            <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" alt="Primex Showroom" />
            <div className="about-card-overlay">
              <div className="about-stat"><span className="astat-n">100%</span><span className="astat-l">Quality Checked</span></div>
              <div className="about-stat"><span className="astat-n">Abuja</span><span className="astat-l">Based & Serving Nigeria</span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* VISION & MISSION */}
    <section className="about-vm section-padding">
      <div className="container">
        <Reveal><span className="section-label">Our Direction</span><h2 className="section-title">Vision &amp; Mission</h2></Reveal>
        <div className="vm-full-grid">
          <Reveal delay={0.1}>
            <div className="vmf-card">
              <div className="vmf-icon-label">Vision</div>
              <p>To be Abuja's most trusted supplier of quality building materials and interior solutions, expanding to serve communities across Nigeria with excellence, style and reliability.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="vmf-card vmf-accent">
              <div className="vmf-icon-label">Mission</div>
              <p>Primex Living Concepts exists to provide contractors, homeowners, and businesses with high quality, durable and affordable building materials while delivering exceptional service, reliable supply and practical solutions for every interior project.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* VALUES */}
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <Reveal className="values-header">
          <span className="section-label">What Drives Us</span>
          <h2 className="section-title">Our Core Values</h2>
        </Reveal>
        <div className="values-grid">
          {values.map((v, i) => (
            <motion.div key={i} className="value-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageTransition>
);

export default About;
