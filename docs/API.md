# API Reference: Proposal Brief Builder

## Static app contract

The browser app is local-first. Data is stored in the user's browser unless explicitly exported.

| Capability | File | Contract |
|---|---|---|
| Product config | `src/config.ts` | Mission, rubric, sample scenario, privacy rules. |
| Domain engine | `src/domain-core.ts` | Domain-specific calculations and generated artifacts. |
| release certification | `src/v3-core.ts` | Release gates, export/import, deterministic hashes. |
| SaaS command center | `src/saas-core.ts` | Packaging, operating metrics, playbooks, governance controls, roadmap exports. |

## Python backend HTTP API

Base URL: `http://127.0.0.1:8787`

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Runtime health and product identity. |
| POST | `/score` | Build backend release packet from evidence rows. |

Example:

```bash
curl -s http://127.0.0.1:8787/health
curl -s -X POST http://127.0.0.1:8787/score \
  -H 'content-type: application/json' \
  -d '{"rows": []}'
```

## OpenAPI

See `openapi.yaml` for backend-enabled products.


## Backend hardening notes

Request/response schemas should be treated as the public contract for optional backend services. Backends are designed for local batch validation and future SaaS API integration; client data should remain local unless an operator explicitly sends a payload.
