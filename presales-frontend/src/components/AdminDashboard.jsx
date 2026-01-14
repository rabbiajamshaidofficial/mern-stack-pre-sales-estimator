import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PricingSettings from './PricingSettings'; // Import the component we created

const AdminDashboard = ({ token }) => {
  const [allEstimates, setAllEstimates] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalLeads: 0 });
  const [activeTab, setActiveTab] = useState('data'); // New state to toggle views

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/estimate/admin/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data.success) {
          const data = res.data.data;
          setAllEstimates(data);
          
          const total = data.reduce((sum, item) => {
            const price = Number(item.estimatedCost?.replace(/[^0-9.-]+/g, "")) || 0;
            return sum + price;
          }, 0);
          
          setStats({ totalRevenue: total, totalLeads: data.length });
        }
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      }
    };
    fetchAdminData();
  }, [token]);

  return (
    <div style={{ padding: '30px', background: '#f8fafc' }}>
      
      {/* --- Tab Navigation --- */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <button 
          onClick={() => setActiveTab('data')}
          style={{
            padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontWeight: '700', fontSize: '0.8rem',
            background: activeTab === 'data' ? '#4f46e5' : '#fff',
            color: activeTab === 'data' ? '#fff' : '#64748b',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        >
          CLIENT PIPELINE
        </button>
        <button 
          onClick={() => setActiveTab('logic')}
          style={{
            padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontWeight: '700', fontSize: '0.8rem',
            background: activeTab === 'logic' ? '#4f46e5' : '#fff',
            color: activeTab === 'logic' ? '#fff' : '#64748b',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        >
          PRICING & LOGIC SETTINGS
        </button>
      </div>

      {activeTab === 'data' ? (
        <>
          {/* --- Stats Cards --- */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div style={{ flex: 1, background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800' }}>MASTER PIPELINE VALUE</p>
              <h1 style={{ color: '#6366f1', margin: 0 }}>${stats.totalRevenue.toLocaleString()}</h1>
            </div>
            <div style={{ flex: 1, background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800' }}>TOTAL CLIENTS SERVED</p>
              <h1 style={{ margin: 0 }}>{stats.totalLeads}</h1>
            </div>
          </div>

          {/* --- Client Table --- */}
          <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: '#f8fafc', borderBottom: '2px solid #f1f5f9' }}>
                <tr>
                  <th style={{ padding: '15px' }}>CLIENT NAME</th>
                  <th style={{ padding: '15px' }}>INDUSTRY</th>
                  <th style={{ padding: '15px' }}>PLATFORM</th>
                  <th style={{ padding: '15px' }}>COST</th>
                </tr>
              </thead>
              <tbody>
                {allEstimates.map((est) => (
                  <tr key={est._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ fontWeight: '700' }}>{est.userId?.name || 'Inbound Lead'}</div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{est.userId?.email}</div>
                    </td>
                    <td style={{ padding: '15px' }}>{est.industryFocus}</td>
                    <td style={{ padding: '15px' }}>{est.targetPlatform}</td>
                    <td style={{ padding: '15px', fontWeight: '800', color: '#6366f1' }}>{est.estimatedCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* --- Logic Settings View --- */
        <PricingSettings token={token} />
      )}
    </div>
  );
};

export default AdminDashboard;