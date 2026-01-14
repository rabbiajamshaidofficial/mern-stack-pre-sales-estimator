import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = ({ token, setEstimates }) => {
  const [formData, setFormData] = useState({
    industryFocus: 'E-commerce',
    targetPlatform: 'Web Application',
    coreProblem: 'Cloud Spend & FinOps Optimization',
    customProblem: '',
    projectScale: 'Startup (MVP)'
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!token) return;

    const submissionData = {
      ...formData,
      coreProblem: formData.coreProblem === 'Other' ? formData.customProblem : formData.coreProblem
    };

    try {
      const res = await axios.post('http://localhost:5000/api/estimate', submissionData, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (res.data.success) {
        // ALERT REMOVED HERE
        setEstimates(prev => [res.data.data, ...prev]);
        setFormData({ ...formData, customProblem: '' });
      }
    } catch (err) {
      // ALERTS REMOVED HERE
      console.error("Generation failed", err);
    }
  };

  return (
    <section className="section-panel" style={{ padding: '30px' }}>
      <h3 className="section-title">Strategic Architecture Discovery</h3>
      <form onSubmit={handleGenerate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        
        <div>
          <label className="input-label">INDUSTRY FOCUS</label>
          <select className="modern-select" value={formData.industryFocus} onChange={(e) => setFormData({...formData, industryFocus: e.target.value})}>
            <option value="Healthcare">Healthcare</option>
            <option value="FinTech">FinTech</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>

        <div>
          <label className="input-label">TARGET PLATFORM</label>
          <select className="modern-select" value={formData.targetPlatform} onChange={(e) => setFormData({...formData, targetPlatform: e.target.value})}>
            <option value="Web Application">Web Application</option>
            <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
            <option value="Web + Mobile Solution">Web + Mobile Solution</option>
          </select>
        </div>

        <div>
          <label className="input-label">CORE PAIN POINT</label>
          <select className="modern-select" value={formData.coreProblem} onChange={(e) => setFormData({...formData, coreProblem: e.target.value})}>
            <option value="Cloud Spend & FinOps Optimization">Cloud Spend & FinOps</option>
            <option value="Agentic AI & LLM Implementation">Agentic AI Strategy</option>
            <option value="Legacy System & Tech Debt Modernization">Legacy Modernization</option>
            <option value="Zero-Trust Security & Compliance">Zero-Trust Security</option>
            <option value="Other">Other / Custom Challenge...</option>
          </select>
        </div>

        {formData.coreProblem === 'Other' ? (
          <div>
            <label className="input-label">SPECIFIC CHALLENGE</label>
            <input 
              className="modern-input" 
              placeholder="Describe your problem..." 
              value={formData.customProblem} 
              onChange={(e) => setFormData({...formData, customProblem: e.target.value})} 
              required 
            />
          </div>
        ) : (
          <div>
            <label className="input-label">PROJECT SCALE</label>
            <select className="modern-select" value={formData.projectScale} onChange={(e) => setFormData({...formData, projectScale: e.target.value})}>
              <option value="Startup (MVP)">Startup (MVP)</option>
              <option value="Small-Medium Business">SMB Growth</option>
              <option value="Enterprise">Enterprise Transformation</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn-generate-proposal" style={{ gridColumn: 'span 2', marginTop: '10px' }}>
          Generate Discovery Report
        </button>
      </form>
    </section>
  );
};

export default LeadForm;