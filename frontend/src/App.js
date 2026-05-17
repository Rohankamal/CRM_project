import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaWhatsapp, FaUserPlus, FaUsers, FaCheckCircle, FaTrashAlt, FaGlobeAmericas, FaSearch } from 'react-icons/fa';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => { fetchLeads(); }, []);

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
    if (window.confirm("Are you sure you want to permanently delete this record?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchLeads();
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  const s = {
    container: { fontFamily: "'Inter', sans-serif", backgroundImage: "url('https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=1920&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh', padding: '50px 20px', boxSizing: 'border-box', color: '#ffffff' },
    wrapper: { maxWidth: '1200px', margin: '0 auto', backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(16px)', borderRadius: '20px', padding: '40px', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)' },
    header: { fontSize: '2.2rem', fontWeight: '700', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    statusIndicator: { fontSize: '0.85rem', fontWeight: '600', color: '#4ade80', backgroundColor: 'rgba(22, 163, 74, 0.2)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(74, 222, 128, 0.4)' },
    mainLayout: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '25px', marginBottom: '30px' },
    statsPanel: { backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' },
    statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    statCard: { backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center' },
    statIconBox: { width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' },
    panel: { backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '24px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
    input: { width: '100%', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', backgroundColor: 'rgba(15, 23, 42, 0.4)', color: '#fff', outline: 'none', boxSizing: 'border-box' },
    select: { width: '100%', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', backgroundColor: '#1e293b', color: '#fff', cursor: 'pointer', boxSizing: 'border-box', outline: 'none' },
    btnSubmit: { width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', gridColumn: 'span 2' },
    searchBar: { display: 'flex', alignItems: 'center', backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 16px', marginBottom: '20px', width: '300px' },
    tablePanel: { backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { backgroundColor: 'rgba(255, 255, 255, 0.04)', color: '#94a3b8', padding: '14px 20px', fontSize: '0.85rem', fontWeight: '600', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' },
    td: { padding: '15px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0', fontSize: '0.95rem' },
    
    badge: (status) => {
      let bg = 'rgba(245, 158, 11, 0.15)', text = '#fbbf24', border = 'rgba(251, 191, 36, 0.3)';
      if (status === 'Converted') { bg = 'rgba(16, 185, 129, 0.15)'; text = '#34d399'; border = 'rgba(52, 211, 153, 0.3)'; }
      else if (status === 'Not Interested') { bg = 'rgba(239, 68, 68, 0.15)'; text = '#f87171'; border = 'rgba(248, 113, 113, 0.3)'; }
      return { padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', display: 'inline-block', backgroundColor: bg, color: text, border: border };
    },
    
    // Dropdown fix with explicit dark theme colors
    selectStatus: { backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', borderRadius: '6px', padding: '6px 10px', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' },
    optionItem: { backgroundColor: '#1e293b', color: '#ffffff' }
  };

  return (
    <div style={s.container}>
      <div style={s.wrapper}>
        
        <div style={s.header}>
          <span>Enterprise Lead Dashboard</span>
          <span style={s.statusIndicator}>System Core Active</span>
        </div>

        <div style={s.mainLayout}>
          <div style={s.statsPanel}>
            <div style={{ marginBottom: '15px', fontWeight: '600', color: '#cbd5e1' }}>Dashboard Metrics</div>
            <div style={s.statsGrid}>
              <div style={s.statCard}>
                <div style={s.statIconBox}><FaUsers color="#60a5fa" /></div>
                <div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Total Leads</div><div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{leads.length}</div></div>
              </div>
              <div style={s.statCard}>
                <div style={s.statIconBox}><FaCheckCircle color="#34d399" /></div>
                <div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Converted</div><div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{leads.filter(l => l.status === 'Converted').length}</div></div>
              </div>
            </div>
          </div>

          <div style={s.panel}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '15px' }}><FaUserPlus /> Record New Lead</h2>
            <form onSubmit={handleAddLead} style={s.formGrid}>
              <input name="name" placeholder="Client Name" value={form.name} onChange={handleInputChange} required style={s.input} />
              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleInputChange} required style={s.input} />
              <div style={{ gridColumn: 'span 2' }}>
                <select name="source" value={form.source} onChange={handleInputChange} style={s.select}>
                  <option value="Call" style={s.optionItem}>Call</option>
                  <option value="WhatsApp" style={s.optionItem}>WhatsApp</option>
                  <option value="Field" style={s.optionItem}>Field</option>
                </select>
              </div>
              <button type="submit" style={s.btnSubmit}>Save Lead</button>
            </form>
          </div>
        </div>

        <div style={s.searchBar}>
          <FaSearch color="#64748b" style={{ marginRight: '10px' }} />
          <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%' }} />
        </div>

        <div style={s.tablePanel}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Lead Identity</th>
                <th style={s.th}>Contact</th>
                <th style={s.th}>Source</th>
                <th style={s.th}>Status State</th>
                <th style={s.th} style={{ textAlign: 'right', paddingRight: '25px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ ...s.td, textAlign: 'center' }}>Syncing datasets...</td></tr>
              ) : filteredLeads.length === 0 ? (
                <tr><td colSpan="5" style={{ ...s.td, textAlign: 'center' }}>No records found.</td></tr>
              ) : (
                filteredLeads.map(lead => (
                  <tr key={lead.id}>
                    <td style={{ ...s.td, fontWeight: '600' }}>{lead.name}</td>
                    <td style={s.td}><FaPhoneAlt size={11} color="#64748b" /> {lead.phone}</td>
                    <td style={s.td}>{lead.source}</td>
                    <td style={s.td}><span style={s.badge(lead.status || 'Interested')}>{lead.status || 'Interested'}</span></td>
                    <td style={{ ...s.td, textAlign: 'right', paddingRight: '25px' }}>
                      <select value={lead.status || 'Interested'} onChange={(e) => handleUpdateStatus(lead.id, e.target.value)} style={s.selectStatus}>
                        <option value="Interested" style={s.optionItem}>Interested</option>
                        <option value="Not Interested" style={s.optionItem}>Not Interested</option>
                        <option value="Converted" style={s.optionItem}>Converted</option>
                      </select>
                      <button onClick={() => handleDeleteLead(lead.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', marginLeft: '15px' }}><FaTrashAlt /></button>
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