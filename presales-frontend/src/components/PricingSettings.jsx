import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PricingSettings.css'; // Import the new CSS file

const PricingSettings = ({ token }) => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/rules');
                setRules(res.data);
            } catch (err) { console.error("Fetch failed", err); }
        };
        fetchRules();
    }, []);

    const handleUpdate = async (id, newValue) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/rules/${id}`, { value: newValue });
            alert("✅ Logic updated successfully!");
        } catch (err) { alert("❌ Update failed"); }
    };

    return (
        <div className="settings-card">
            <div className="settings-header">
                <h2>Pricing & Logic Control</h2>
                <p className="settings-description">Manage global base costs and multipliers for the estimation engine.</p>
            </div>

            <table className="logic-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Rule Name</th>
                        <th>Current Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rules.map((rule) => (
                        <tr key={rule._id} className="logic-row">
                            <td><span className="category-badge">{rule.category}</span></td>
                            <td style={{ fontWeight: '700', color: '#334155' }}>{rule.key}</td>
                            <td>
                                <div className="logic-input-group">
                                    <input 
                                        className="logic-input"
                                        type="number" 
                                        defaultValue={rule.value} 
                                        step="0.01"
                                        onChange={(e) => rule.tempValue = e.target.value}
                                    />
                                    <span className="unit-label">
                                        {rule.category.includes('Multiplier') ? 'x' : '$'}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <button 
                                    className="btn-save-logic"
                                    onClick={() => handleUpdate(rule._id, rule.tempValue || rule.value)}
                                >
                                    Save Changes
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PricingSettings;