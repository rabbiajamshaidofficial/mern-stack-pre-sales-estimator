// Modified generateEstimate to accept 'rules' from the Database
function generateEstimate(input, rulesFromDb) {
  const { industryFocus, targetPlatform, coreProblem, projectScale } = input;

  // Convert the DB array into objects for easy lookup
  const getRule = (category) => {
    return rulesFromDb
      .filter(r => r.category === category)
      .reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
  };

  const platformBase = getRule("platformBase");
  const industryMultipliers = getRule("industryMultipliers");
  const painPointEffort = getRule("painPointEffort");
  const scaleMultiplier = getRule("scaleMultiplier");

  let base = platformBase[targetPlatform] || 3500;
  let multiplier = industryMultipliers[industryFocus] || 1.0;
  let painCost = painPointEffort[coreProblem] || 3500; 
  let scale = scaleMultiplier[projectScale] || 1.0;

  let total = (base + painCost) * multiplier * scale;

  return {
    estimatedCost: `$${Math.round(total).toLocaleString()}`,
    timeline: calculateTimeline(projectScale, coreProblem),
    teamSize: calculateTeam(total, projectScale),
    coreProblem 
  };
}