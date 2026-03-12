import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-mark"><span>P</span></div>
                <div>
                  <div className="footer-logo-name">PRIMEX</div>
                  <div className="footer-logo-sub">LIVING CONCEPTS</div>
                </div>
              </div>
              <p className="footer-tagline">
                Quality building materials and interior solutions for contractors, homeowners, and businesses in Abuja and across Nigeria.
              </p>
              <div className="footer-social">
                <a href="#!" aria-label="Instagram"><FiInstagram /></a>
                <a href="#!" aria-label="Facebook"><FiFacebook /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><Link to="/services">Tiles & Flooring</Link></li>
                <li><Link to="/services">Sanitary Wares</Link></li>
                <li><Link to="/services">Interior Fittings</Link></li>
                <li><Link to="/services">Wall Cladding</Link></li>
                <li><Link to="/services">Design Consultation</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact Us</h4>
              <div className="contact-item"><FiMapPin /><span>Abuja, Nigeria</span></div>
              <div className="contact-item"><FiPhone /><a href="tel:07042613350">07042613350</a></div>
              <div className="contact-item"><FiMail /><a href="mailto:primexlivingconcepts@gmail.com">primexlivingconcepts@gmail.com</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {year} Primex Living Concepts. All rights reserved.</p>
          <p>Abuja, Nigeria</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
