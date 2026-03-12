import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import "./Services.css";

const Reveal = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const services = [
  {
    number: "01",
    title: "Tiles & Flooring",
    tagline: "Durable, beautiful floors for every space.",
    desc: "We supply a comprehensive range of floor and wall tiles, vinyl planks, and engineered flooring for residential and commercial use. Our selection covers all budgets without compromising on quality or finish.",
    items: [
      "Porcelain floor tiles (various sizes & finishes)",
      "Ceramic wall and floor tiles",
      "Marble-effect and stone-look tiles",
      "Wood-grain vinyl and LVT flooring",
      "Anti-slip tiles for outdoor and wet areas",
      "Grout, adhesive, and laying accessories",
    ],
  },
  {
    number: "02",
    title: "Sanitary Wares",
    tagline: "Quality bathroom fittings for modern living.",
    desc: "Our sanitary ware range covers everything needed to fit out a bathroom or WC to a high standard. We stock leading brands and contemporary designs that combine functionality with lasting style.",
    items: [
      "Toilet WCs — close-coupled and wall-hung",
      "Hand basins and vanity units",
      "Bathtubs — freestanding and built-in",
      "Shower trays, enclosures, and screens",
      "Taps, mixers, and shower heads",
      "Bathroom accessories sets",
    ],
  },
  {
    number: "03",
    title: "Wall Cladding & Panels",
    tagline: "Transform walls into design features.",
    desc: "Wall cladding can completely change the character of a room or building exterior. We supply a variety of cladding and panel systems that are easy to install, durable, and visually striking.",
    items: [
      "Stone and brick-effect wall cladding",
      "PVC and composite wall panels",
      "Decorative 3D wall tiles",
      "Exterior facade cladding",
      // "Installation accessories and adhesives",
      // "Feature wall panels for living rooms and lobbies",
    ],
  },

  {
    number: "04",
    title: "Design Consultation",
    tagline: "Expert guidance for confident decisions.",
    desc: "Not sure where to start? Our experienced team offers practical consultation to help you select the right materials for your project, budget, and timeline. We help contractors and homeowners alike make informed decisions.",
    items: [
      "Material selection guidance",
      "Budget planning and cost estimation",
      "Product suitability advice for your space",
      "Quantity surveying support",
      "Sourcing specific or custom materials",
      "Project planning assistance",
    ],
  },
];

const Services = () => (
  <PageTransition>
    <section className="page-hero">
      <div className="page-hero-overlay" />
      <img
        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
        alt="Services"
        className="page-hero-img"
      />
      <div className="container page-hero-content">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          What We Offer
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.75 }}
        >
          Our Products <em>&amp; Services</em>
        </motion.h1>
      </div>
    </section>

    {/* INTRO */}
    <section className="services-intro section-padding">
      <div className="container">
        <Reveal className="si-inner">
          <span className="section-label">Complete Interior Solutions</span>
          <h2 className="section-title">
            Everything Your Project Needs,
            <br />
            Under One Roof
          </h2>
          <p>
            From the floor beneath your feet to the ceiling above your head,
            Primex Living Concepts supplies the materials and expertise to
            complete any interior project — residential or commercial, new build
            or renovation.
          </p>
        </Reveal>
      </div>
    </section>

    {/* SERVICES LIST */}
    <section className="services-list-section">
      <div className="container">
        <div className="services-list">
          {services.map((svc, i) => (
            <Reveal key={i} delay={0.05}>
              <div className="service-listing-card">
                <div className="slc-header">
                  <span className="slc-number">{svc.number}</span>
                  <div className="slc-title-block">
                    <h2>{svc.title}</h2>
                    <p className="slc-tagline">{svc.tagline}</p>
                  </div>
                  <Link to="/contact" className="slc-cta-btn">
                    Get Quote <FiArrowRight />
                  </Link>
                </div>
                <div className="slc-body">
                  <p className="slc-desc">{svc.desc}</p>
                  <div className="slc-items">
                    {svc.items.map((item, j) => (
                      <div key={j} className="slc-item">
                        <FiCheckCircle className="slc-check" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="services-cta section-padding">
      <div className="container">
        <Reveal className="svc-cta-inner">
          <span className="section-label">Get Started</span>
          <h2>Ready to Begin Your Project?</h2>
          <p>
            Contact the Primex team today for a free quotation and expert advice
            on the right materials for your specific needs.
          </p>
          <div className="svc-cta-actions">
            <Link to="/contact" className="btn-primary">
              Request a Quotation
            </Link>
            <a href="tel:07042613350" className="btn-outline">
              Call Us: 07042613350
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  </PageTransition>
);

export default Services;
