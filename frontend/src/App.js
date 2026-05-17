import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaWhatsapp, FaUserPlus, FaUsers, FaCheckCircle, FaTrashAlt, FaGlobeAmericas, FaSlidersH, FaBriefcase } from 'react-icons/fa';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', source: 'Call' });

  const API_URL = 'http://localhost:5000/leads';

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setLeads(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ name: '', phone: '', source: 'Call' });
      fetchLeads();
    } catch (err) {
      console.error("Add Error:", err);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchLeads();
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this lead record?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchLeads();
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  // --- Image Ke Hissab Se Cyber Glassmorphic Theme ---
  const s = {
    container: { 
      fontFamily: "'Inter', 'Segoe UI', sans-serif", 
      // Image jaisa premium circuit board dark-tech wallpaper background
      backgroundImage: "url('https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=1920&auto=format&fit=crop')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh', 
      padding: '50px 20px',
      boxSizing: 'border-box',
      color: '#ffffff'
    },
    wrapper: { 
      maxWidth: '1200px', 
      margin: '0 auto',
      // Transparent Frosted Glass Outer Container (Jaise aapki image mein hai)
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)', 
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    header: { fontSize: '2.2rem', fontWeight: '700', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' },
    statusIndicator: { fontSize: '0.85rem', fontWeight: '600', color: '#4ade80', backgroundColor: 'rgba(22, 163, 74, 0.2)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(74, 222, 128, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '6px' },
    
    // Grid Setup for Inner Blocks
    mainLayout: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '25px', marginBottom: '30px' },
    
    // Stats Sub-Grid Block
    statsPanel: { backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(8px)' },
    statsTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '18px' },
    statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    statCard: { backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center' },
    statIconBox: { width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' },
    statLabel: { color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500' },
    statValue: { color: '#ffffff', fontSize: '1.6rem', fontWeight: '700', marginTop: '2px' },
    
    // Lead Entry Block (Frosted Glass Panel)
    panel: { backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '24px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(8px)' },
    sectionTitle: { color: '#ffffff', fontSize: '1.2rem', fontWeight: '600', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' },
    
    // Input/Form Architecture
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
    inputGroup: { display: 'flex', flexDirection: 'column' },
    fullWidthGroup: { gridColumn: 'span 2', display: 'flex', flexDirection: 'column' },
    label: { color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' },
    input: { width: '100%', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', backgroundColor: 'rgba(15, 23, 42, 0.4)', color: '#fff', boxSizing: 'border-box' },
    select: { width: '100%', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', backgroundColor: 'rgba(15, 23, 42, 0.4)', color: '#fff', cursor: 'pointer', boxSizing: 'border-box' },
    btnSubmit: { width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', marginTop: '14px', gridColumn: 'span 2', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' },
    
    // Data Table Frame (Bottom Panel)
    tablePanel: { backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden', backdropFilter: 'blur(8px)' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#94a3b8', padding: '14px 20px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'capitalize', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' },
    td: { padding: '15px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0', fontSize: '0.95rem', verticalAlign: 'middle' },
    
    // Status Badges & Quick Action Controls
    badge: (status) => ({
      padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', display: 'inline-block',
      backgroundColor: status === 'Converted' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
      color: status === 'Converted' ? '#34d399' : '#fbbf24',
      border: status === 'Converted' ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(251, 191, 36, 0.3)'
    }),
    btnAction: { padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#e2e8f0', cursor: 'pointer', marginRight: '10px' },
    btnDelete: { padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#f87171', cursor: 'pointer', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }
  };

  return (
    <div style={s.container}>
      <div style={s.wrapper}>
        
        {/* BRAND HEADER */}
        <div style={s.header}>
          <span style={{ letterSpacing: '-0.5px' }}>Corporate Lead Dashboard</span>
          <span style={s.statusIndicator}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }}></span>
            System Active
          </span>
        </div>

        {/* MIDSECTION: STATS & DATA INGESTION LAYOUT */}
        <div style={s.mainLayout}>
          
          {/* STATS MATRIX DISPLAY */}
          <div style={s.statsPanel}>
            <div style={s.statsTitle}>Stats Grid</div>
            <div style={s.statsGrid}>
              <div style={s.statCard}>
                <div style={s.statIconBox}><FaUsers size={18} color="#60a5fa" /></div>
                <div>
                  <div style={s.statLabel}>Captured Leads</div>
                  <div style={s.statValue}>{leads.length}</div>
                </div>
              </div>
              <div style={s.statCard}>
                <div style={s.statIconBox}><FaCheckCircle size={18} color="#34d399" /></div>
                <div>
                  <div style={s.statLabel}>Conversions</div>
                  <div style={s.statValue}>{leads.filter(l => l.status === 'Converted').length}</div>
                </div>
              </div>
              <div style={s.statCard}>
                <div style={s.statIconBox}><FaSlidersH size={18} color="#fbbf24" /></div>
                <div>
                  <div style={s.statLabel}>Carried Leads</div>
                  <div style={s.statValue}>{leads.filter(l => l.status !== 'Converted').length}</div>
                </div>
              </div>
              <div style={s.statCard}>
                <div style={s.statIconBox}><FaBriefcase size={18} color="#c084fc" /></div>
                <div>
                  <div style={s.statLabel}>Cooperating</div>
                  <div style={s.statValue}>{leads.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ACQUISITION INGESTION SYSTEM */}
          <div style={s.panel}>
            <h2 style={s.sectionTitle}>Record New Lead Entry</h2>
            <form onSubmit={handleAddLead} style={s.formGrid}>
              <div style={s.inputGroup}>
                <label style={s.label}>Name</label>
                <input name="name" placeholder="Firstname" value={form.name} onChange={handleInputChange} required style={s.input} />
              </div>
              <div style={s.inputGroup}>
                <label style={s.label}>Lead name</label>
                <input name="phone" placeholder="Contact link" value={form.phone} onChange={handleInputChange} required style={s.input} />
              </div>
              <div style={s.fullWidthGroup}>
                <label style={s.label}>Source</label>
                <select name="source" value={form.source} onChange={handleInputChange} style={s.select}>
                  <option value="Call">Inbound Telephony Route</option>
                  <option value="WhatsApp">WhatsApp Business Link</option>
                  <option value="Field">On-Site Account Acquisition</option>
                </select>
              </div>
              <button type="submit" style={s.btnSubmit}>Save Record</button>
            </form>
          </div>

        </div>

        {/* BOTTOM LEVEL: ACTIVE RECORDS ARCHIVE */}
        <div style={s.tablePanel}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Lead Identity</th>
                <th style={s.th}>Contact</th>
                <th style={s.th}>Source</th>
                <th style={s.th}>Status</th>
                <th style={s.th} style={{ textAlign: 'right', paddingRight: '25px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ ...s.td, textAlign: 'center', color: '#94a3b8' }}>Syncing datasets...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ ...s.td, textAlign: 'center', color: '#94a3b8' }}>Zero records stored inside the secure database schema.</td>
                </tr>
              ) : (
                leads.map(lead => (
                  <tr key={lead.id}>
                    <td style={{ ...s.td, fontWeight: '600', color: '#ffffff' }}>{lead.name}</td>
                    <td style={s.td}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                        <FaPhoneAlt size={11} color="#64748b" /> {lead.phone}
                      </span>
                    </td>
                    <td style={s.td}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                        {lead.source === 'WhatsApp' ? <FaWhatsapp size={14} color="#25D366" /> : <FaGlobeAmericas size={14} color="#94a3b8" />}
                        {lead.source}
                      </span>
                    </td>
                    <td style={s.td}>
                      <span style={s.badge(lead.status)}>{lead.status}</span>
                    </td>
                    <td style={{ ...s.td, textAlign: 'right', paddingRight: '25px' }}>
                      {lead.status !== 'Converted' && (
                        <button onClick={() => handleUpdateStatus(lead.id, 'Converted')} style={s.btnAction}>Actions</button>
                      )}
                      <button onClick={() => handleDeleteLead(lead.id)} style={s.btnDelete} title="Purge Record">
                        <FaTrashAlt size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;