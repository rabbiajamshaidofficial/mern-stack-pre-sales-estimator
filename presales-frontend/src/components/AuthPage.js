import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = ({ setToken, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(""); // New state for on-screen errors

  const handleAction = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear old errors when trying again
    const endpoint = isLogin ? 'login' : 'register';
    
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        setToken(res.data.token);
        setUser(res.data.user);
      }
    } catch (err) {
      // FIX: Replace alert() with state-based error message
      setErrorMessage(err.response?.data?.message || "Authentication Error");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleAction} className="auth-form section-panel" style={{ maxWidth: '400px', margin: '100px auto', padding: '40px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {/* 🔹 ON-SCREEN ERROR MESSAGE (REPLACES POP-UP ALERT) */}
        {errorMessage && (
          <div style={{ 
            background: '#fef2f2', 
            color: '#dc2626', 
            padding: '10px', 
            borderRadius: '6px', 
            marginBottom: '15px', 
            fontSize: '0.85rem', 
            textAlign: 'center',
            border: '1px solid #fee2e2'
          }}>
            {errorMessage}
          </div>
        )}
        
        {!isLogin && (
          <div className="input-group">
            <label className="input-label">Name</label>
            <input 
              className="modern-input" 
              type="text" 
              required
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
        )}
        
        <div className="input-group">
          <label className="input-label">Email</label>
          <input 
            className="modern-input" 
            type="email" 
            required
            value={formData.email}
            placeholder="client@company.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Password</label>
          <input 
            className="modern-input" 
            type="password" 
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
        </div>
        
        <button type="submit" className="btn-generate-proposal" style={{ width: '100%', marginTop: '20px' }}>
          {isLogin ? 'Sign In' : 'Register'}
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#4f46e5' }} 
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMessage(""); // Clear error when switching modes
            }}>
          {isLogin ? "Need an account? Register" : "Have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;