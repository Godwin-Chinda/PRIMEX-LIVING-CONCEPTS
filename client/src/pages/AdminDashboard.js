import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiMessageSquare, FiMail, FiPlus, FiTrash2, FiGrid, FiLogOut, FiEye } from 'react-icons/fi';
import api from '../hooks/useApi';
import './AdminDashboard.css';

const ADMIN_PASS = 'primex2024';

const AdminDashboard = () => {
  const [auth, setAuth] = useState(localStorage.getItem('primex-admin') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', category: '', image: '' });
  const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '', rating: 5, role: '' });

  useEffect(() => { if (auth) fetchData(); }, [auth]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, t, m] = await Promise.all([
        api.get('/products').catch(() => ({ data: { products: [] } })),
        api.get('/testimonials').catch(() => ({ data: [] })),
        api.get('/contact').catch(() => ({ data: [] })),
      ]);
      setProducts(p.data.products || []);
      setTestimonials(t.data || []);
      setMessages(m.data || []);
    } catch (e) {}
    setLoading(false);
  };

  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASS) { localStorage.setItem('primex-admin', 'true'); setAuth(true); }
    else setAuthError('Incorrect password. Please try again.');
  };

  const handleLogout = () => { localStorage.removeItem('primex-admin'); setAuth(false); };

  const addProduct = async e => {
    e.preventDefault();
    try { await api.post('/products', newProduct); setNewProduct({ name: '', description: '', category: '', image: '' }); fetchData(); alert('Product added!'); }
    catch { alert('Failed to add product.'); }
  };

  const deleteProduct = async id => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`).catch(() => {}); fetchData();
  };

  const addTestimonial = async e => {
    e.preventDefault();
    try { await api.post('/testimonials', newTestimonial); setNewTestimonial({ name: '', text: '', rating: 5, role: '' }); fetchData(); alert('Testimonial added!'); }
    catch { alert('Failed.'); }
  };

  const deleteTestimonial = async id => {
    if (!window.confirm('Delete?')) return;
    await api.delete(`/testimonials/${id}`).catch(() => {}); fetchData();
  };

  const markRead = async id => { await api.patch(`/contact/${id}/read`).catch(() => {}); fetchData(); };

  if (!auth) {
    return (
      <div className="admin-login">
        <motion.div className="login-card" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="login-logo"><div className="login-logo-mark"><span>P</span></div><div><div className="login-logo-name">PRIMEX</div><div className="login-logo-sub">ADMIN PANEL</div></div></div>
          <h2>Secure Access</h2>
          <p>Enter your admin password to continue.</p>
          <form onSubmit={handleLogin} className="login-form">
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            {authError && <p className="auth-error">{authError}</p>}
            <button type="submit" className="btn-primary">Access Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiGrid /> },
    { id: 'products', label: 'Products', icon: <FiBox /> },
    { id: 'testimonials', label: 'Testimonials', icon: <FiMessageSquare /> },
    { id: 'messages', label: 'Messages', icon: <FiMail /> },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sb-logo-mark"><span>P</span></div>
          <div><div className="sb-name">PRIMEX</div><div className="sb-sub">Admin</div></div>
        </div>
        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button key={tab.id} className={`sidebar-link ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.icon}<span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}><FiLogOut /> Logout</button>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
          <span className="admin-badge">Administrator</span>
        </div>
        <div className="admin-content">

          {activeTab === 'overview' && (
            <div className="overview-grid">
              {[
                { label: 'Products', value: products.length, icon: <FiBox />, color: '#2d6a4f' },
                { label: 'Testimonials', value: testimonials.length, icon: <FiMessageSquare />, color: '#b5804a' },
                { label: 'Messages', value: messages.length, icon: <FiMail />, color: '#3a7abf' },
                { label: 'Unread', value: messages.filter(m => !m.read).length, icon: <FiEye />, color: '#c0392b' },
              ].map((s, i) => (
                <motion.div key={i} className="ov-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="ov-icon" style={{ background: s.color + '18', color: s.color }}>{s.icon}</div>
                  <div><span className="ov-val">{s.value}</span><span className="ov-lbl">{s.label}</span></div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="admin-section">
              <div className="admin-card">
                <h3><FiPlus /> Add Product</h3>
                <form onSubmit={addProduct} className="admin-form">
                  <div className="aform-row">
                    <input placeholder="Product Name *" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                    <input placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                  </div>
                  <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} rows={3} />
                  <input placeholder="Image URL (optional)" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                  <button type="submit" className="btn-primary"><FiPlus /> Add Product</button>
                </form>
              </div>
              <div className="admin-card">
                <h3>All Products ({products.length})</h3>
                {loading ? <p className="loading-txt">Loading...</p> : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead><tr><th>Name</th><th>Category</th><th>Action</th></tr></thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p._id}><td>{p.name}</td><td>{p.category || '—'}</td>
                            <td><button className="del-btn" onClick={() => deleteProduct(p._id)}><FiTrash2 /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="admin-section">
              <div className="admin-card">
                <h3><FiPlus /> Add Testimonial</h3>
                <form onSubmit={addTestimonial} className="admin-form">
                  <div className="aform-row">
                    <input placeholder="Client Name *" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} required />
                    <input placeholder="Role / Title" value={newTestimonial.role} onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})} />
                  </div>
                  <textarea placeholder="Testimonial text *" value={newTestimonial.text} onChange={e => setNewTestimonial({...newTestimonial, text: e.target.value})} rows={4} required />
                  <div className="aform-row">
                    <select value={newTestimonial.rating} onChange={e => setNewTestimonial({...newTestimonial, rating: Number(e.target.value)})}>
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                    <button type="submit" className="btn-primary"><FiPlus /> Add</button>
                  </div>
                </form>
              </div>
              <div className="admin-card">
                <h3>Testimonials ({testimonials.length})</h3>
                <div className="test-list">
                  {testimonials.map(t => (
                    <div key={t._id} className="test-item">
                      <div className="ti-content"><strong>{t.name}</strong><span>{t.role}</span><p>"{t.text}"</p></div>
                      <button className="del-btn" onClick={() => deleteTestimonial(t._id)}><FiTrash2 /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="admin-section">
              <div className="admin-card">
                <h3>Contact Messages ({messages.length})</h3>
                <div className="msg-list">
                  {messages.map(msg => (
                    <div key={msg._id} className={`msg-item ${msg.read ? 'read' : 'unread'}`}>
                      <div className="msg-head">
                        <div><strong>{msg.name}</strong><span className="msg-email">{msg.email}</span></div>
                        <div className="msg-meta">
                          <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                          {!msg.read ? <button className="mark-btn" onClick={() => markRead(msg._id)}>Mark Read</button> : <span className="read-tag">Read</span>}
                        </div>
                      </div>
                      <p className="msg-body">{msg.message}</p>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="loading-txt">No messages yet.</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
