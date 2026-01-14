import React from 'react';
import { Layers } from 'lucide-react';

const Header = () => (
  <nav className="app-navbar">
    <div className="brand-logo">
      <Layers size={26} strokeWidth={2.5} />
    </div>
    <div className="brand-text">
      <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>EstimationEngine</h1>
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Agency Sales Accelerator</p>
    </div>
  </nav>
);

export default Header;