export function validateSaasDefinition(saas) {
    for (const key of ['productName', 'northStar', 'segments', 'jobs', 'plans', 'metrics', 'playbooks', 'integrations', 'controls', 'roadmap']) {
        if (!saas[key] || (Array.isArray(saas[key]) && saas[key].length === 0))
            throw new Error(`missing saas.${key}`);
    }
    for (const key of ['personas', 'journeys', 'features', 'experiments', 'risks', 'automations', 'dashboards', 'templates']) {
        if (!Array.isArray(saas[key]) || saas[key].length < 3)
            throw new Error(`standalone SaaS needs deep ${key} definitions`);
    }
    if (saas.plans.length < 4)
        throw new Error('standalone SaaS needs at least 4 packaging tiers');
    if (saas.metrics.length < 4)
        throw new Error('standalone SaaS needs at least 4 operating metrics');
    if (saas.controls.length < 4)
        throw new Error('standalone SaaS needs privacy and governance controls');
    if (saas.features.length < 6)
        throw new Error('standalone SaaS needs a robust feature catalog');
    if (saas.journeys.length < 5)
        throw new Error('standalone SaaS needs an end-to-end customer journey');
    return true;
}
export function createSaasWorkspace(saas, now = new Date().toISOString()) {
    validateSaasDefinition(saas);
    return {
        version: 'saas-2.0',
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
        })),
        personas: (saas.personas || []).map((persona, index) => ({
            id: `persona-${index + 1}`,
            ...persona,
            priority: index === 0 ? 'primary' : index === 1 ? 'buyer' : 'influencer',
            interviewed: index === 0
        })),
        journeys: (saas.journeys || []).map((journey, index) => ({
            id: `journey-${index + 1}`,
            ...journey,
            status: index < 2 ? 'instrumented' : 'planned'
        })),
        features: (saas.features || []).map((feature, index) => ({
            id: `feature-${index + 1}`,
            ...feature,
            status: index < 2 ? 'live' : index < 4 ? 'pilot' : 'planned',
            priority: index < 2 ? 'P0' : index < 4 ? 'P1' : 'P2'
        })),
        experiments: (saas.experiments || []).map((experiment, index) => ({
            id: `experiment-${index + 1}`,
            ...experiment,
            status: index === 0 ? 'running' : 'queued'
        })),
        risks: (saas.risks || []).map((risk, index) => ({
            id: `risk-${index + 1}`,
            ...risk,
            status: index < 2 ? 'mitigated' : 'monitoring'
        })),
        automations: (saas.automations || []).map((automation, index) => ({
            id: `automation-${index + 1}`,
            ...automation,
            status: index < 1 ? 'enabled' : index < 3 ? 'designed' : 'backlog'
        })),
        dashboards: (saas.dashboards || []).map((dashboard, index) => ({
            id: `dashboard-${index + 1}`,
            ...dashboard,
            status: index === 0 ? 'live' : 'mocked'
        })),
        templates: (saas.templates || []).map((template, index) => ({
            id: `template-${index + 1}`,
            ...template,
            status: index === 0 ? 'ready' : 'draft'
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
    const liveFeatures = (workspace.features || []).filter((feature) => ['live', 'pilot'].includes(feature.status)).length;
    const featureScore = Math.round((liveFeatures / Math.max(1, saas.features.length)) * 100);
    const mitigatedRisks = (workspace.risks || []).filter((risk) => risk.status === 'mitigated').length;
    const riskScore = Math.round((mitigatedRisks / Math.max(1, saas.risks.length)) * 100);
    const enabledAutomations = (workspace.automations || []).filter((automation) => ['enabled', 'designed'].includes(automation.status)).length;
    const automationScore = Math.round((enabledAutomations / Math.max(1, saas.automations.length)) * 100);
    const nearTermRoadmap = (workspace.roadmap || []).filter((item) => item.phase === 'Now').length;
    const roadmapScore = Math.min(100, Math.round((nearTermRoadmap / 2) * 100));
    const score = Math.round(metricScore * 0.25 + playbookScore * 0.15 + controlScore * 0.2 + roadmapScore * 0.1 + featureScore * 0.15 + riskScore * 0.1 + automationScore * 0.05);
    return {
        score,
        label: score >= 90 ? 'SaaS-ready' : score >= 75 ? 'Launch candidate' : score >= 55 ? 'Pilot-ready' : 'Needs buildout',
        metricScore,
        playbookScore,
        controlScore,
        roadmapScore,
        featureScore,
        riskScore,
        automationScore,
        readyPlaybooks,
        verifiedControls,
        liveFeatures,
        mitigatedRisks,
        enabledAutomations,
        warnings: saasWarnings(score, controlScore, workspace)
    };
}
export function saasWarnings(score, controlScore, workspace) {
    const warnings = [];
    if (score < 75)
        warnings.push('SaaS readiness is below launch-candidate threshold.');
    if (controlScore < 100)
        warnings.push('All governance controls need verified evidence before paid pilots.');
    const missingAutomation = (workspace.playbooks || []).filter((playbook) => !String(playbook.automation || '').trim());
    if (missingAutomation.length)
        warnings.push(`${missingAutomation.length} playbook(s) need an automation or integration path.`);
    const lowMetrics = (workspace.metrics || []).filter((metric) => Number(metric.current || 0) < Number(metric.target || 0));
    if (lowMetrics.length)
        warnings.push(`${lowMetrics.length} operating metric(s) are below target.`);
    const plannedFeatures = (workspace.features || []).filter((feature) => feature.status === 'planned');
    if (plannedFeatures.length)
        warnings.push(`${plannedFeatures.length} product feature(s) still need pilot or live status.`);
    const openRisks = (workspace.risks || []).filter((risk) => risk.status !== 'mitigated');
    if (openRisks.length)
        warnings.push(`${openRisks.length} launch risk(s) still need mitigation evidence.`);
    return warnings;
}
export function applySaasSample(saas) {
    const workspace = createSaasWorkspace(saas);
    workspace.account.launchStage = 'paid-pilot';
    workspace.metrics = workspace.metrics.map((metric) => ({ ...metric, current: metric.target }));
    workspace.playbooks = workspace.playbooks.map((playbook) => ({ ...playbook, status: 'ready', owner: playbook.owner || 'Program lead' }));
    workspace.controls = workspace.controls.map((control) => ({ ...control, status: 'verified', evidence: control.evidence || `Verified operating control: ${control.label}` }));
    workspace.roadmap = workspace.roadmap.map((item, index) => ({ ...item, phase: index < 2 ? 'Now' : index < 4 ? 'Next' : 'Later' }));
    workspace.personas = workspace.personas.map((persona) => ({ ...persona, interviewed: true }));
    workspace.journeys = workspace.journeys.map((journey) => ({ ...journey, status: 'instrumented' }));
    workspace.features = workspace.features.map((feature, index) => ({ ...feature, status: index < 4 ? 'live' : 'pilot' }));
    workspace.experiments = workspace.experiments.map((experiment, index) => ({ ...experiment, status: index < 2 ? 'running' : 'queued' }));
    workspace.risks = workspace.risks.map((risk) => ({ ...risk, status: 'mitigated' }));
    workspace.automations = workspace.automations.map((automation) => ({ ...automation, status: 'enabled' }));
    workspace.dashboards = workspace.dashboards.map((dashboard) => ({ ...dashboard, status: 'live' }));
    workspace.templates = workspace.templates.map((template) => ({ ...template, status: 'ready' }));
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
    lines.push('## Personas');
    (workspace.personas || []).forEach((persona) => lines.push(`- **${persona.name} (${persona.priority}):** ${persona.success}`));
    lines.push('', '## Jobs to be done');
    saas.jobs.forEach((job) => lines.push(`- ${job}`));
    lines.push('', '## Customer journey');
    (workspace.journeys || []).forEach((journey) => lines.push(`- **${journey.stage}:** ${journey.moment}; success: ${journey.success}; automation: ${journey.automation}`));
    lines.push('', '## Operating metrics');
    workspace.metrics.forEach((metric) => lines.push(`- **${metric.label}:** ${metric.current}/${metric.target} — ${metric.note}`));
    lines.push('', '## Packaging');
    saas.plans.forEach((plan) => lines.push(`- **${plan.name} (${plan.price}):** ${plan.promise}`));
    lines.push('', '## Product feature catalog');
    (workspace.features || []).forEach((feature) => lines.push(`- **${feature.name} [${feature.tier}/${feature.status}]:** ${feature.description}; evidence: ${feature.evidence}`));
    lines.push('', '## Playbooks and automation');
    workspace.playbooks.forEach((playbook) => lines.push(`- **${playbook.name}:** ${playbook.status}; owner ${playbook.owner}; automation ${playbook.automation}`));
    lines.push('', '## Automation map');
    (workspace.automations || []).forEach((automation) => lines.push(`- **${automation.name}:** ${automation.trigger} → ${automation.action} (${automation.status})`));
    lines.push('', '## Governance controls');
    workspace.controls.forEach((control) => lines.push(`- **${control.label}:** ${control.status}${control.evidence ? ` — ${control.evidence}` : ''}`));
    lines.push('', '## Risk register');
    (workspace.risks || []).forEach((risk) => lines.push(`- **${risk.risk} (${risk.severity}/${risk.status}):** ${risk.mitigation}; owner ${risk.owner}`));
    lines.push('', '## Dashboards and templates');
    (workspace.dashboards || []).forEach((dashboard) => lines.push(`- **${dashboard.name}:** ${dashboard.audience}; widgets: ${(dashboard.widgets || []).join(', ')}`));
    (workspace.templates || []).forEach((template) => lines.push(`- **${template.name} (${template.format}/${template.status}):** ${(template.sections || []).join(', ')}`));
    lines.push('', '## Experiments');
    (workspace.experiments || []).forEach((experiment) => lines.push(`- **${experiment.hypothesis}:** ${experiment.measure} → ${experiment.target}; ${experiment.cadence}; ${experiment.status}`));
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
    (workspace.personas || []).forEach((persona) => rows.push(['persona', persona.name, persona.priority, persona.role, persona.success]));
    (workspace.journeys || []).forEach((journey) => rows.push(['journey', journey.stage, journey.status, journey.automation, journey.success]));
    (workspace.features || []).forEach((feature) => rows.push(['feature', feature.name, feature.status, feature.tier, feature.description]));
    (workspace.experiments || []).forEach((experiment) => rows.push(['experiment', experiment.measure, experiment.status, experiment.target, experiment.hypothesis]));
    (workspace.risks || []).forEach((risk) => rows.push(['risk', risk.risk, risk.status, risk.owner, risk.mitigation]));
    (workspace.automations || []).forEach((automation) => rows.push(['automation', automation.name, automation.status, automation.owner, `${automation.trigger} -> ${automation.action}`]));
    (workspace.dashboards || []).forEach((dashboard) => rows.push(['dashboard', dashboard.name, dashboard.status, dashboard.audience, (dashboard.widgets || []).join('; ')]));
    (workspace.templates || []).forEach((template) => rows.push(['template', template.name, template.status, template.format, (template.sections || []).join('; ')]));
    return rows.map((row) => row.map(csvEscape).join(',')).join('\n');
}
function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function csvEscape(value) {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
//# sourceMappingURL=saas-core.js.map