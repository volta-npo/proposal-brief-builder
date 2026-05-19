export function validateSaasDefinition(saas) {
  for (const key of ['productName', 'northStar', 'segments', 'jobs', 'plans', 'metrics', 'playbooks', 'integrations', 'controls', 'roadmap']) {
    if (!saas[key] || (Array.isArray(saas[key]) && saas[key].length === 0)) throw new Error(`missing saas.${key}`);
  }
  if (saas.plans.length < 4) throw new Error('standalone SaaS needs at least 4 packaging tiers');
  if (saas.metrics.length < 4) throw new Error('standalone SaaS needs at least 4 operating metrics');
  if (saas.controls.length < 4) throw new Error('standalone SaaS needs privacy and governance controls');
  return true;
}

export function createSaasWorkspace(saas, now = new Date().toISOString()) {
  validateSaasDefinition(saas);
  return {
    version: 'saas-1.0',
    createdAt: now,
    updatedAt: now,
    account: {
      workspaceName: `${saas.productName} Pilot Workspace`,
      owner: 'Volta Program Lead',
      segment: saas.segments[0],
      plan: saas.plans[1].name,
      launchStage: 'pilot'
    },
    metrics: saas.metrics.map((metric) => ({
      id: slug(metric.label),
      label: metric.label,
      current: metric.current,
      target: metric.target,
      note: metric.note
    })),
    playbooks: saas.playbooks.map((playbook, index) => ({
      id: `playbook-${index + 1}`,
      name: playbook,
      owner: index % 2 === 0 ? 'Program lead' : 'Mentor reviewer',
      status: index < 2 ? 'ready' : 'draft',
      automation: saas.integrations[index % saas.integrations.length]
    })),
    controls: saas.controls.map((control, index) => ({
      id: `control-${index + 1}`,
      label: control,
      status: index < 2 ? 'verified' : 'draft',
      evidence: index < 2 ? `Evidence policy documented for ${control}` : ''
    })),
    roadmap: saas.roadmap.map((item, index) => ({
      id: `roadmap-${index + 1}`,
      item,
      phase: index < 2 ? 'Now' : index < 4 ? 'Next' : 'Later',
      impact: index % 3 === 0 ? 'revenue' : index % 3 === 1 ? 'retention' : 'operations'
    }))
  };
}

export function calculateSaasReadiness(saas, workspace) {
  validateSaasDefinition(saas);
  const metrics = workspace.metrics || [];
  const metricScore = metrics.length ? Math.round(metrics.reduce((sum, metric) => sum + Math.min(100, Math.round((Number(metric.current || 0) / Math.max(1, Number(metric.target || 1))) * 100)), 0) / metrics.length) : 0;
  const readyPlaybooks = (workspace.playbooks || []).filter((playbook) => ['ready', 'automated'].includes(playbook.status)).length;
  const playbookScore = Math.round((readyPlaybooks / Math.max(1, saas.playbooks.length)) * 100);
  const verifiedControls = (workspace.controls || []).filter((control) => control.status === 'verified' && String(control.evidence || '').trim()).length;
  const controlScore = Math.round((verifiedControls / Math.max(1, saas.controls.length)) * 100);
  const nearTermRoadmap = (workspace.roadmap || []).filter((item) => item.phase === 'Now').length;
  const roadmapScore = Math.min(100, Math.round((nearTermRoadmap / 2) * 100));
  const score = Math.round(metricScore * 0.35 + playbookScore * 0.25 + controlScore * 0.25 + roadmapScore * 0.15);
  return {
    score,
    label: score >= 90 ? 'SaaS-ready' : score >= 75 ? 'Launch candidate' : score >= 55 ? 'Pilot-ready' : 'Needs buildout',
    metricScore,
    playbookScore,
    controlScore,
    roadmapScore,
    readyPlaybooks,
    verifiedControls,
    warnings: saasWarnings(score, controlScore, workspace)
  };
}

export function saasWarnings(score, controlScore, workspace) {
  const warnings = [];
  if (score < 75) warnings.push('SaaS readiness is below launch-candidate threshold.');
  if (controlScore < 100) warnings.push('All governance controls need verified evidence before paid pilots.');
  const missingAutomation = (workspace.playbooks || []).filter((playbook) => !String(playbook.automation || '').trim());
  if (missingAutomation.length) warnings.push(`${missingAutomation.length} playbook(s) need an automation or integration path.`);
  const lowMetrics = (workspace.metrics || []).filter((metric) => Number(metric.current || 0) < Number(metric.target || 0));
  if (lowMetrics.length) warnings.push(`${lowMetrics.length} operating metric(s) are below target.`);
  return warnings;
}

export function applySaasSample(saas) {
  const workspace = createSaasWorkspace(saas);
  workspace.account.launchStage = 'paid-pilot';
  workspace.metrics = workspace.metrics.map((metric) => ({ ...metric, current: metric.target }));
  workspace.playbooks = workspace.playbooks.map((playbook) => ({ ...playbook, status: 'ready', owner: playbook.owner || 'Program lead' }));
  workspace.controls = workspace.controls.map((control) => ({ ...control, status: 'verified', evidence: control.evidence || `Verified operating control: ${control.label}` }));
  workspace.roadmap = workspace.roadmap.map((item, index) => ({ ...item, phase: index < 2 ? 'Now' : index < 4 ? 'Next' : 'Later' }));
  workspace.updatedAt = new Date().toISOString();
  return workspace;
}

export function buildSaasExecutiveBrief(config, saas, workspace) {
  const readiness = calculateSaasReadiness(saas, workspace);
  const lines = [];
  lines.push(`# ${config.title} SaaS Operating Brief`);
  lines.push('');
  lines.push(`**Workspace:** ${workspace.account.workspaceName}`);
  lines.push(`**Owner:** ${workspace.account.owner}`);
  lines.push(`**Segment:** ${workspace.account.segment}`);
  lines.push(`**Plan:** ${workspace.account.plan}`);
  lines.push(`**Readiness:** ${readiness.score}/100 (${readiness.label})`);
  lines.push(`**North-star:** ${saas.northStar}`);
  lines.push('');
  lines.push('## Jobs to be done');
  saas.jobs.forEach((job) => lines.push(`- ${job}`));
  lines.push('', '## Operating metrics');
  workspace.metrics.forEach((metric) => lines.push(`- **${metric.label}:** ${metric.current}/${metric.target} — ${metric.note}`));
  lines.push('', '## Packaging');
  saas.plans.forEach((plan) => lines.push(`- **${plan.name} (${plan.price}):** ${plan.promise}`));
  lines.push('', '## Playbooks and automation');
  workspace.playbooks.forEach((playbook) => lines.push(`- **${playbook.name}:** ${playbook.status}; owner ${playbook.owner}; automation ${playbook.automation}`));
  lines.push('', '## Governance controls');
  workspace.controls.forEach((control) => lines.push(`- **${control.label}:** ${control.status}${control.evidence ? ` — ${control.evidence}` : ''}`));
  lines.push('', '## Roadmap');
  workspace.roadmap.forEach((item) => lines.push(`- **${item.phase}:** ${item.item} (${item.impact})`));
  lines.push('', '## Warnings');
  readiness.warnings.length ? readiness.warnings.forEach((warning) => lines.push(`- ${warning}`)) : lines.push('- No SaaS readiness warnings.');
  return lines.join('\n');
}

export function buildSaasCsv(workspace) {
  const rows = [['type', 'label', 'status_or_value', 'owner_or_target', 'note']];
  (workspace.metrics || []).forEach((metric) => rows.push(['metric', metric.label, String(metric.current), String(metric.target), metric.note]));
  (workspace.playbooks || []).forEach((playbook) => rows.push(['playbook', playbook.name, playbook.status, playbook.owner, playbook.automation]));
  (workspace.controls || []).forEach((control) => rows.push(['control', control.label, control.status, '', control.evidence]));
  (workspace.roadmap || []).forEach((item) => rows.push(['roadmap', item.item, item.phase, item.impact, '']));
  return rows.map((row) => row.map(csvEscape).join(',')).join('\n');
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
