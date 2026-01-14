import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeadForm from './components/LeadForm';
import QuoteCard from './components/QuoteCard';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard'; // Import the new dashboard
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    const fetchEstimates = async () => {
      if (!token || user?.role === 'admin') return; // Admins don't need "my-estimates" fetch here
      
      try {
        const res = await axios.get('http://localhost:5000/api/estimate/my-estimates', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setEstimates(res.data.data || []);
        }
      } catch (err) {
        if (err.response?.status === 401) handleLogout();
      }
    };
    fetchEstimates();
  }, [token, user]);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setEstimates([]);
  };

  const handleDelete = async (id) => {
    // ALERT REMOVED HERE
    try {
      const res = await axios.delete(`http://localhost:5000/api/estimate/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setEstimates(prev => prev.filter(est => est._id !== id));
      }
    } catch (err) {
      console.error("Delete failed"); // Alert removed
    }
  };

  if (!token) return <AuthPage setToken={setToken} setUser={setUser} />;

  return (
    <div className="dashboard-layout">
      <nav className="app-navbar" style={{ justifyContent: 'space-between', padding: '10px 40px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="brand-logo" style={{ background: '#4f46e5', color: 'white', padding: '5px 12px', borderRadius: '8px', fontWeight: 'bold' }}>P</div>
          <h2 className="section-title" style={{ margin: 0 }}>Presales Intelligence</h2>
        </div>

        <div className="user-info-group" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="user-badge" style={{ textAlign: 'right' }}>
            <p className="user-name" style={{ margin: 0, fontWeight: '700' }}>{user?.name}</p>
            <p className="user-role-tag" style={{ margin: 0, fontSize: '0.7rem', color: '#6366f1', fontWeight: '800' }}>
              {user?.role?.toUpperCase()}
            </p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="main-content">
        {/* CONDITIONAL ROUTING: This is the fix for your layout issue */}
        {user?.role === 'admin' ? (
          <AdminDashboard token={token} /> 
        ) : (
          <div style={{ padding: '40px' }}>
            <LeadForm token={token} setEstimates={setEstimates} />
            
            <div className="quote-grid" style={{ 
              marginTop: '30px', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
              gap: '20px' 
            }}>
              {Array.isArray(estimates) && estimates.length > 0 ? (
                estimates.map(est => (
                  <QuoteCard key={est._id} estimate={est} onDelete={handleDelete} />
                ))
              ) : (
                <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b', marginTop: '40px' }}>
                  No blueprints generated yet.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;