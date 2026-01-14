import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const EstimateForm = ({ formData, setFormData, onGenerate }) => {
  const [showPainPoints, setShowPainPoints] = useState(false);
  const dropdownRef = useRef(null);

  // Modern 2026 Industry Pain Points
  const painPointOptions = [
    "Cloud Spend & FinOps Optimization",
    "Agentic AI & LLM Implementation",
    "Legacy System & Tech Debt Modernization",
    "Scalability Under AI Workloads",
    "Zero-Trust Security & Compliance"
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowPainPoints(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePoint = (point) => {
    const current = formData.selectedPainPoints || [];
    const updated = current.includes(point) 
      ? current.filter(p => p !== point) 
      : [...current, point];
    setFormData({ ...formData, selectedPainPoints: updated });
  };

  return (
    <section className="section-panel" style={{ padding: '32px' }}>
      <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
        <Sparkles size={22} color="#4f46e5" /> Project Architecture Blueprint
      </h2>

      <form onSubmit={onGenerate} className="discovery-form">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
          
          <div className="input-group" style={{ flex: 1, minWidth: '200px' }}>
            <label className="input-label">INDUSTRY VERTICAL</label>
            <select className="modern-select" value={formData.businessType} onChange={e => setFormData({...formData, businessType: e.target.value})}>
              <option value="Healthcare">Healthcare</option>
              <option value="FinTech">FinTech</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          <div className="input-group" style={{ flex: 1, minWidth: '200px' }}>
            <label className="input-label">DEPLOYMENT PLATFORM</label>
            <select className="modern-select" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})}>
              <option value="Web Application">Web Application</option>
              <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
              <option value="Cross-platform Solution">Cross-platform Solution</option>
            </select>
          </div>

          <div className="input-group" ref={dropdownRef} style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <label className="input-label">CORE CHALLENGES</label> 
            <div className="custom-dropdown-trigger" 
                 onClick={() => setShowPainPoints(!showPainPoints)}
                 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ color: formData.selectedPainPoints?.length > 0 ? '#1e293b' : '#94a3b8' }}>
                {formData.selectedPainPoints?.length > 0 ? `${formData.selectedPainPoints.length} Selected` : "Select Pain Points"}
              </span>
              <ChevronDown size={16} />
            </div>
            {showPainPoints && (
              <div className="pain-points-menu" style={{ width: '100%', top: '100%', position: 'absolute', zIndex: 10, background: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
                {painPointOptions.map(option => (
                  <label key={option} className="dropdown-item" style={{ display: 'flex', gap: '10px', padding: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.selectedPainPoints?.includes(option)} onChange={() => togglePoint(option)} />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '5px' }}>
            <div className="ai-checkbox-wrapper" style={{ margin: 0 }}>
              <input type="checkbox" id="ai-toggle" checked={formData.aiRequired} onChange={e => setFormData({...formData, aiRequired: e.target.checked})} />
              <label htmlFor="ai-toggle" style={{ fontWeight: '700', fontSize: '0.85rem' }}>AI Logic</label>
            </div>

            <button type="submit" className="btn-generate-proposal" style={{ height: '48px', padding: '0 24px' }}>
              Analyze <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EstimateForm;