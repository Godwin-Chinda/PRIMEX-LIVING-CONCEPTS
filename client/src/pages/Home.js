import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import api from "../hooks/useApi";
import "./Home.css";

const Reveal = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const defaultTestimonials = [
  {
    _id: "1",
    name: "Emeka Okafor",
    role: "Property Developer, Abuja",
    text: "Primex Living Concepts is our go-to supplier. The quality of their tiles and fittings is exceptional, and delivery is always reliable. Highly recommend them to any developer in Abuja.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Ngozi Adeyemi",
    role: "Homeowner",
    text: "I furnished my entire home with materials from Primex. From the flooring tiles to the sanitary wares, everything was top quality. The team was helpful and guided me through every choice.",
    rating: 5,
  },
  {
    _id: "3",
    name: "Chukwudi Eze",
    role: "Building Contractor",
    text: "As a contractor, I need a supplier I can count on. Primex delivers quality materials on time, every time. Their range is excellent and the pricing is fair for the quality you get.",
    rating: 5,
  },
];

const Home = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((res) => {
        if (res.data?.length) setTestimonials(res.data);
      })
      .catch(() => {});
  }, []);

  const t = testimonials[tIdx];

  const whyUs = [
    {
      num: "01",
      title: "Quality Assured",
      desc: "Every product we stock is carefully selected for durability, finish, and long-term performance.",
    },
    {
      num: "02",
      title: "Reliable Supply",
      desc: "We maintain consistent stock levels so your project never stalls waiting for materials.",
    },
    {
      num: "03",
      title: "Expert Guidance",
      desc: "Our knowledgeable team helps you choose the right materials for your budget and vision.",
    },
    {
      num: "04",
      title: "Competitive Pricing",
      desc: "Premium quality does not have to mean premium prices. We offer fair rates for every budget.",
    },
    {
      num: "05",
      title: "Trusted by Contractors",
      desc: "Builders and developers across Abuja trust us to deliver the right materials, on time.",
    },
    {
      num: "06",
      title: "Wide Product Range",
      desc: "From tiles and sanitary wares to wall cladding and interior fittings — all under one roof.",
    },
  ];

  return (
    <PageTransition>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay" />
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Premium Interior"
            className="hero-img"
          />
        </div>
        <div className="container hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span>Abuja, Nigeria</span>
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            Quality Materials.
            <br />
            <em>Beautiful Interiors.</em>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
          >
            Premium interior building materials and finishing solutions for
            modern homes and commercial spaces across Abuja and Nigeria.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link to="/contact" className="btn-primary">
              Get a Free Quote <FiArrowRight />
            </Link>
            <Link to="/services" className="btn-hero-ghost">
              Our Services
            </Link>
          </motion.div>
          <motion.div
            className="hero-contact-strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <a href="tel:07042613350" className="hero-contact-item">
              <FiPhone />
              <span>07042613350</span>
            </a>
            <span className="hero-contact-divider" />
            <a
              href="mailto:primexlivingconcepts@gmail.com"
              className="hero-contact-item"
            >
              <FiMail />
              <span>primexlivingconcepts@gmail.com</span>
            </a>
          </motion.div>
        </div>
        <div className="hero-scroll">
          <motion.div
            className="scroll-bar"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          />
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="promise-section section-padding">
        <div className="container">
          <Reveal className="promise-inner">
            <span className="section-label">Our Promise</span>
            <blockquote className="promise-text">
              "At Primex Living Concepts quality meets design. We offer premium
              interior building materials and finishing solutions, from tiles
              and sanitary wares to interior fittings; crafted for modern
              residential and commercial spaces. Our approach combines lasting
              strength with refined aesthetics to elevate everyday interiors."
            </blockquote>
            <div className="divider centered" />
            <div className="promise-actions">
              <Link to="/products" className="btn-primary">
                View Our Products
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vm-section section-padding">
        <div className="container">
          <Reveal className="vm-header">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              Driving Interior Excellence
              <br />
              Across Nigeria
            </h2>
          </Reveal>
          <div className="vm-grid">
            <Reveal delay={0.1}>
              <div className="vm-card">
                <div className="vm-card-tag">Vision</div>
                <p>
                  To be Abuja's most trusted supplier of quality building
                  materials and interior solutions, expanding to serve
                  communities across Nigeria with excellence, style and
                  reliability.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="vm-card vm-card-accent">
                <div className="vm-card-tag">Mission</div>
                <p>
                  Primex Living Concepts exists to provide contractors,
                  homeowners, and businesses with high quality, durable and
                  affordable building materials while delivering exceptional
                  service, reliable supply and practical solutions for every
                  interior project.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section section-padding">
        <div className="container">
          <Reveal className="why-header">
            <span className="section-label">Why Primex?</span>
            <h2 className="section-title">Built on Trust &amp; Quality</h2>
            <p className="why-sub">
              We are more than a materials supplier — we are a partner in
              bringing your interior vision to life.
            </p>
          </Reveal>
          <div className="why-grid">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                className="why-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <span className="why-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="services-teaser section-padding">
        <div className="container">
          <div className="services-teaser-grid">
            <Reveal className="st-left">
              <span className="section-label">What We Offer</span>
              <h2 className="section-title">
                Full-Range Interior Material Solutions
              </h2>
              <div className="divider" />
              <p>
                From floor to ceiling, we supply everything you need to complete
                any interior project — residential or commercial, large or
                small.
              </p>
              <Link
                to="/services"
                className="btn-primary"
                style={{ marginTop: "2rem" }}
              >
                Explore All Services <FiArrowRight />
              </Link>
            </Reveal>
            <div className="st-right">
              {[
                "Tiles & Flooring",
                "Sanitary Wares",
                "Wall Cladding & Panels",
                "Interior Fittings & Fixtures",
                "Ceiling Solutions",
                "Design Consultation",
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="st-item">
                    <span className="st-dot" />
                    <span>{item}</span>
                    <FiChevronRight className="st-arrow" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <Reveal className="test-header">
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">Trusted Across Abuja</h2>
          </Reveal>
          <div className="test-wrap">
            <motion.div
              className="test-card"
              key={tIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.38 }}
            >
              <div className="test-stars">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <FiStar key={i} className="star-icon" />
                ))}
              </div>
              <blockquote>"{t.text}"</blockquote>
              <div className="test-author">
                <div className="test-avatar">{t.name.charAt(0)}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role || "Client"}</span>
                </div>
              </div>
            </motion.div>
            <div className="test-nav">
              <button
                className="test-nav-btn"
                onClick={() =>
                  setTIdx(
                    (i) => (i - 1 + testimonials.length) % testimonials.length,
                  )
                }
              >
                <FiChevronLeft />
              </button>
              <div className="test-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`tdot ${i === tIdx ? "active" : ""}`}
                    onClick={() => setTIdx(i)}
                  />
                ))}
              </div>
              <button
                className="test-nav-btn"
                onClick={() => setTIdx((i) => (i + 1) % testimonials.length)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-overlay" />
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt="CTA"
          className="cta-bg"
        />
        <div className="container cta-content">
          <Reveal>
            <span className="section-label">Ready to Start?</span>
            <h2>
              Let's Build Something
              <br />
              <em>Exceptional Together</em>
            </h2>
            <p>
              Contact us today for a free consultation and quotation. We're here
              to help you find the perfect materials for your project.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">
                Get a Free Quote
              </Link>
              <a href="tel:07042613350" className="btn-cta-ghost">
                <FiPhone /> Call 07042613350
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
