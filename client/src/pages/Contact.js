import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import api from "../hooks/useApi";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/contact", {
        name: form.name,
        email: form.email,
        message: `Phone: ${form.phone}\n\n${form.message}`,
      });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setError(
        "Failed to send message. Please call us directly on 07042613350.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="page-hero-overlay" />
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Contact"
          className="page-hero-img"
        />
        <div className="container page-hero-content">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Talk to Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.75 }}
          >
            Get in Touch <em>Today</em>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="contact-layout">
            {/* LEFT */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Contact Details</span>
              <h2 className="section-title">We're Here to Help</h2>
              <div className="divider" />
              <p className="contact-intro">
                Whether you're looking for a quote, need product advice, or want
                to discuss a project, our team is ready to assist. Reach out to
                us through any of the channels below.
              </p>

              <div className="contact-details">
                <a href="tel:07042613350" className="cd-item">
                  <div className="cd-icon">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="cd-label">Phone</span>
                    <strong className="cd-value">07042613350</strong>
                  </div>
                </a>
                <a
                  href="mailto:primexlivingconcepts@gmail.com"
                  className="cd-item"
                >
                  <div className="cd-icon">
                    <FiMail />
                  </div>
                  <div>
                    <span className="cd-label">Email</span>
                    <strong className="cd-value">
                      primexlivingconcepts@gmail.com
                    </strong>
                  </div>
                </a>
                <div className="cd-item">
                  <div className="cd-icon">
                    <FiMapPin />
                  </div>
                  <div>
                    <span className="cd-label">Location</span>
                    <strong className="cd-value">Abuja, Nigeria</strong>
                  </div>
                </div>
                <div className="cd-item">
                  <div className="cd-icon">
                    <FiClock />
                  </div>
                  <div>
                    <span className="cd-label">Business Hours</span>
                    <strong className="cd-value">Mon – Sat: 8AM – 4PM</strong>
                  </div>
                </div>
              </div>

              <div className="contact-whatsapp">
                <a
                  href="https://wa.me/2347042613350?text=Hello%21%20I%27m%20interested%20in%20Primex%20Living%20Concepts%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              className="contact-form-wrap"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {success ? (
                <div className="success-state">
                  <div className="success-icon">
                    <FiCheckCircle />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for getting in touch. We'll respond as soon as
                    possible — usually within a few hours during business hours.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => setSuccess(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="form-title">Send Us a Message</h3>
                  <p className="form-subtitle">
                    Fill in the form below and we'll get back to you with a
                    quote or more information.
                  </p>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="07XXXXXXXXX"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Your Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project — what materials you need, quantities, location, and any other details..."
                        rows={6}
                        required
                      />
                    </div>
                    {error && <p className="form-error">{error}</p>}
                    <button
                      type="submit"
                      className="btn-primary submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <FiSend />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
