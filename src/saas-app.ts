import { config } from './config.js';
import { saas } from './saas.js';
import { createSaasWorkspace, calculateSaasReadiness, applySaasSample, buildSaasExecutiveBrief, buildSaasCsv } from './saas-core.js';

const key = `volta-oss:${config.slug}:saas`;
let workspace = loadSaas();
function $(selector) { return document.querySelector(selector); }
function $$(selector) { return [...document.querySelectorAll(selector)]; }
function esc(value = '') { return String(value).replace(/[&<>\"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char])); }
function loadSaas() { try { const raw = localStorage.getItem(key); if (raw) return JSON.parse(raw); } catch {} return createSaasWorkspace(saas); }
function saveSaas() { workspace.updatedAt = new Date().toISOString(); localStorage.setItem(key, JSON.stringify(workspace)); }
function download(name, content, type = 'text/plain') { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url); }

function installSaas() {
  document.querySelector('main').insertAdjacentHTML('beforeend', `<section class="saas-console panel" aria-labelledby="saas-title">
    <div class="saas-head">
      <div><p class="eyebrow">Standalone SaaS command center</p><h2 id="saas-title">${esc(saas.productName)} Operating System</h2><p class="muted">Positioning, pricing, portfolio KPIs, playbooks, governance, integrations, and scale roadmap for a standalone SaaS product.</p></div>
      <div class="button-row no-print"><button id="saas-sample" class="secondary">Load SaaS Pilot</button><button id="saas-brief">Export Brief</button><button id="saas-csv" class="secondary">Export CSV</button></div>
    </div>
    <div id="saas-score" class="saas-score"></div>
    <div class="saas-grid"><section><h3>Account cockpit</h3><div id="saas-account" class="form-grid"></div><h3>Packaging</h3><div id="saas-plans" class="saas-cards"></div></section><section><h3>Warnings</h3><ul id="saas-warnings" class="warning-list"></ul><h3>Jobs to be done</h3><ul id="saas-jobs"></ul></section></div>
    <div class="saas-grid"><section><h3>Operating metrics</h3><div id="saas-metrics" class="saas-cards"></div></section><section><h3>Playbooks and automation</h3><div id="saas-playbooks" class="saas-cards"></div></section></div>
    <div class="saas-grid"><section><h3>Governance controls</h3><div id="saas-controls" class="saas-cards"></div></section><section><h3>Scale roadmap</h3><div id="saas-roadmap" class="saas-cards"></div></section></div>
  </section>`);
  $('#saas-sample').addEventListener('click', () => { if (!confirm('Load SaaS pilot sample data? This overwrites only the SaaS command center workspace.')) return; workspace = applySaasSample(saas); saveSaas(); renderSaas(); });
  $('#saas-brief').addEventListener('click', () => download(`${config.slug}-saas-brief.md`, buildSaasExecutiveBrief(config, saas, workspace), 'text/markdown'));
  $('#saas-csv').addEventListener('click', () => download(`${config.slug}-saas-ops.csv`, buildSaasCsv(workspace), 'text/csv'));
  renderSaas();
}

function renderSaas() {
  const readiness = calculateSaasReadiness(saas, workspace);
  $('#saas-score').innerHTML = `<article><strong>${readiness.score}/100</strong><span>${readiness.label}</span><p>${esc(saas.northStar)}</p></article><article><strong>${readiness.metricScore}%</strong><span>Metric attainment</span><p>${readiness.readyPlaybooks}/${saas.playbooks.length} playbooks ready</p></article><article><strong>${readiness.controlScore}%</strong><span>Governance verified</span><p>${readiness.verifiedControls}/${saas.controls.length} controls evidenced</p></article>`;
  $('#saas-account').innerHTML = accountField('workspaceName', 'Workspace') + accountField('owner', 'Owner') + selectField('segment', 'Segment', saas.segments) + selectField('plan', 'Plan', saas.plans.map((plan) => plan.name)) + selectField('launchStage', 'Launch stage', ['discovery', 'pilot', 'paid-pilot', 'scale']);
  $('#saas-plans').innerHTML = saas.plans.map((plan) => `<article><strong>${esc(plan.name)}</strong><span>${esc(plan.price)}</span><p>${esc(plan.promise)}</p></article>`).join('');
  $('#saas-warnings').innerHTML = readiness.warnings.map((warning) => `<li>${esc(warning)}</li>`).join('') || '<li>No SaaS readiness warnings.</li>';
  $('#saas-jobs').innerHTML = saas.jobs.map((job) => `<li>${esc(job)}</li>`).join('');
  $('#saas-metrics').innerHTML = workspace.metrics.map((metric) => `<article><label>${esc(metric.label)}<input data-saas-metric="current" data-id="${esc(metric.id)}" type="number" value="${esc(metric.current)}" /></label><p>${esc(metric.note)}</p><small>Target: ${esc(metric.target)}</small></article>`).join('');
  $('#saas-playbooks').innerHTML = workspace.playbooks.map((playbook) => `<article><strong>${esc(playbook.name)}</strong><label>Status<select data-saas-playbook="status" data-id="${esc(playbook.id)}">${options(['draft','ready','automated'], playbook.status)}</select></label><label>Owner<input data-saas-playbook="owner" data-id="${esc(playbook.id)}" value="${esc(playbook.owner)}" /></label><p>${esc(playbook.automation)}</p></article>`).join('');
  $('#saas-controls').innerHTML = workspace.controls.map((control) => `<article><strong>${esc(control.label)}</strong><label>Status<select data-saas-control="status" data-id="${esc(control.id)}">${options(['draft','verified'], control.status)}</select></label><label>Evidence<input data-saas-control="evidence" data-id="${esc(control.id)}" value="${esc(control.evidence)}" /></label></article>`).join('');
  $('#saas-roadmap').innerHTML = workspace.roadmap.map((item) => `<article><strong>${esc(item.item)}</strong><label>Phase<select data-saas-roadmap="phase" data-id="${esc(item.id)}">${options(['Now','Next','Later'], item.phase)}</select></label><p>${esc(item.impact)}</p></article>`).join('');
  bindSaas();
}

function accountField(field, label) { return `<label>${label}<input data-saas-account="${field}" value="${esc(workspace.account[field])}" /></label>`; }
function selectField(field, label, values) { return `<label>${label}<select data-saas-account="${field}">${options(values, workspace.account[field])}</select></label>`; }
function options(values, current) { return values.map((value) => `<option value="${esc(value)}" ${value === current ? 'selected' : ''}>${esc(value)}</option>`).join(''); }

function bindSaas() {
  $$('[data-saas-account]').forEach((input) => input.addEventListener('input', (event) => { workspace.account[event.target.dataset.saasAccount] = event.target.value; saveSaas(); renderSaas(); }));
  $$('[data-saas-metric]').forEach((input) => input.addEventListener('input', (event) => { const metric = workspace.metrics.find((item) => item.id === event.target.dataset.id); if (!metric) return; metric[event.target.dataset.saasMetric] = Number(event.target.value); saveSaas(); renderSaas(); }));
  $$('[data-saas-playbook]').forEach((input) => input.addEventListener('input', (event) => { const playbook = workspace.playbooks.find((item) => item.id === event.target.dataset.id); if (!playbook) return; playbook[event.target.dataset.saasPlaybook] = event.target.value; saveSaas(); renderSaas(); }));
  $$('[data-saas-control]').forEach((input) => input.addEventListener('input', (event) => { const control = workspace.controls.find((item) => item.id === event.target.dataset.id); if (!control) return; control[event.target.dataset.saasControl] = event.target.value; saveSaas(); renderSaas(); }));
  $$('[data-saas-roadmap]').forEach((input) => input.addEventListener('input', (event) => { const item = workspace.roadmap.find((entry) => entry.id === event.target.dataset.id); if (!item) return; item[event.target.dataset.saasRoadmap] = event.target.value; saveSaas(); renderSaas(); }));
}

installSaas();
