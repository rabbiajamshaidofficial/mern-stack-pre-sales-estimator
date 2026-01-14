import React from 'react';
import { Trash2, Clock, Users, Mail, Phone, ShieldCheck, Zap } from 'lucide-react';

const QuoteCard = ({ estimate, onDelete }) => {
  if (!estimate) return null;

  const getAiSolution = (problem) => {
    const solutions = {
      "Cloud Spend & FinOps Optimization": "Deploying ML-driven cost anomaly detection to identify idle resources and optimize cloud compute instances.",
      "Agentic AI & LLM Implementation": "Architecting a RAG-based autonomous agent framework to automate internal knowledge retrieval and customer workflows.",
      "Legacy System & Tech Debt Modernization": "Using AI-assisted refactoring to decouple monolithic dependencies into scalable, containerized microservices.",
      "Zero-Trust Security & Compliance": "Implementing AI-powered identity verification and automated threat response layers for global regulatory compliance."
    };
    return solutions[problem] || "Specialized discovery plan to map unique architectural constraints to high-availability cloud solutions.";
  };

  return (
    <div className="section-panel" style={{ padding: '24px', position: 'relative', marginBottom: '20px', border: '1px solid #e2e8f0', background: '#fff' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="user-role-tag" style={{ background: '#eef2ff', color: '#4338ca', padding: '4px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>
            {(estimate.targetPlatform || 'Cloud').toUpperCase()}
          </span>
          <span style={{ background: '#f5f3ff', color: '#7c3aed', padding: '4px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12} fill="#7c3aed" /> AI STRATEGY
          </span>
        </div>
        <Trash2 
          size={18} 
          style={{ cursor: 'pointer', color: '#cbd5e1' }} 
          // ALERT REMOVED HERE
          onClick={() => onDelete(estimate._id)} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '800', margin: 0 }}>{estimate.industryFocus?.toUpperCase()}</p>
        <h3 style={{ fontWeight: '800', margin: 0, color: '#0f172a', fontSize: '1.2rem' }}>{estimate.coreProblem}</h3>
      </div>

      <div style={{ background: 'linear-gradient(to right, #f8fafc, #ffffff)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid #6366f1', marginBottom: '15px' }}>
        <p style={{ fontSize: '0.65rem', color: '#6366f1', fontWeight: '800', margin: '0 0 5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ShieldCheck size={14} /> STRATEGIC AI BLUEPRINT
        </p>
        <p style={{ fontSize: '0.82rem', color: '#334155', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
          "{getAiSolution(estimate.coreProblem)}"
        </p>
      </div>

      <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
        <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '700', margin: '0 0 5px' }}>ESTIMATED DISCOVERY INVESTMENT</p>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: '900', fontSize: '1.75rem' }}>{estimate.estimatedCost}</h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', fontSize: '0.75rem', color: '#475569', fontWeight: '600' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {estimate.timeline}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> {estimate.teamSize}</span>
      </div>

      <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#4f46e5', fontWeight: '700' }}>
            <Mail size={14} /> solutions@yourcompany.com
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#4f46e5', fontWeight: '700' }}>
            <Phone size={14} /> +1 (555) 012-3456
          </span>
        </div>
        <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '800' }}>OFFICIAL ARCHITECTURE PROPOSAL</div>
      </div>
    </div>
  );
};

export default QuoteCard;