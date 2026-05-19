import test from 'node:test';
import assert from 'node:assert/strict';
import { config } from '../src/config.js';
import { saas } from '../src/saas.js';
import { validateSaasDefinition, createSaasWorkspace, calculateSaasReadiness, applySaasSample, buildSaasExecutiveBrief, buildSaasCsv } from '../src/saas-core.js';

test('saas definition is standalone-product ready', () => {
  assert.equal(validateSaasDefinition(saas), true);
  assert.equal(saas.plans.length >= 4, true);
  assert.equal(saas.metrics.length >= 4, true);
  assert.equal(saas.controls.length >= 4, true);
  assert.match(saas.northStar, /[a-z]/i);
});

test('initial saas workspace is below fully ready and has warnings', () => {
  const workspace = createSaasWorkspace(saas, '2026-01-01T00:00:00.000Z');
  const readiness = calculateSaasReadiness(saas, workspace);
  assert.equal(workspace.metrics.length, saas.metrics.length);
  assert.ok(readiness.score < 100);
  assert.ok(readiness.warnings.length > 0);
});

test('sample saas workspace reaches launch candidate threshold', () => {
  const workspace = applySaasSample(saas);
  const readiness = calculateSaasReadiness(saas, workspace);
  assert.ok(readiness.score >= 85);
  assert.equal(readiness.controlScore, 100);
  assert.equal(readiness.warnings.length, 0);
});

test('saas executive exports include product, packaging, controls, and roadmap', () => {
  const workspace = applySaasSample(saas);
  const brief = buildSaasExecutiveBrief(config, saas, workspace);
  const csv = buildSaasCsv(workspace);
  assert.match(brief, new RegExp(config.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(brief, /Packaging/);
  assert.match(brief, /Governance controls/);
  assert.match(brief, /Roadmap/);
  assert.match(csv, /type,label,status_or_value/);
  assert.ok(csv.split('\n').length > saas.metrics.length + saas.controls.length);
});
