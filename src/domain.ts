export const domain = {
  "kind": "brief-builder",
  "title": "Proposal Brief Builder",
  "purpose": "A purpose-built brief builder interface for turn messy discovery notes into a clean grant proposal brief before anyone writes prose.",
  "inputTitle": "Product-specific inputs",
  "previewTitle": "Generated working outputs",
  "tableTitle": "Proposal claims",
  "metricLabels": [
    "Evidence Confidence",
    "Narrative Completeness",
    "Budget Alignment"
  ],
  "fields": [
    {
      "id": "organization-client",
      "label": "Organization / client",
      "type": "text",
      "sample": "Eastside Youth Arts Collective",
      "placeholder": "Enter organization / client"
    },
    {
      "id": "primary-goal",
      "label": "Primary goal",
      "type": "text",
      "sample": "proposal sections supported by verified facts",
      "placeholder": "Enter primary goal"
    },
    {
      "id": "owner-reviewer",
      "label": "Owner / reviewer",
      "type": "text",
      "sample": "Volta project lead",
      "placeholder": "Enter owner / reviewer"
    },
    {
      "id": "evidence-source",
      "label": "Evidence source",
      "type": "text",
      "sample": "Owner interview + public audit",
      "placeholder": "Enter evidence source"
    },
    {
      "id": "input-asset",
      "label": "Input asset",
      "type": "text",
      "sample": "Problem statement sourced",
      "placeholder": "Enter input asset"
    },
    {
      "id": "output-format",
      "label": "Output format",
      "type": "text",
      "sample": "Proposal outline",
      "placeholder": "Enter output format"
    },
    {
      "id": "review-threshold",
      "label": "Review threshold",
      "type": "number",
      "sample": 85,
      "placeholder": "Enter review threshold"
    },
    {
      "id": "approved-channel",
      "label": "Approved channel",
      "type": "text",
      "sample": "Owner handoff packet",
      "placeholder": "Enter approved channel"
    }
  ],
  "rows": [
    "Problem statement sourced",
    "Target population defined",
    "Program activities mapped",
    "Outcomes have metrics",
    "Budget facts linked",
    "Evidence appendix complete",
    "Assumptions resolved",
    "Writer handoff generated"
  ],
  "artifacts": [
    "Proposal outline",
    "Writer handoff packet",
    "Evidence appendix CSV"
  ],
  "checks": [
    "No unsupported critical claims",
    "Every outcome needs metric/source",
    "Budget ask must match activities"
  ],
  "sampleClient": "Eastside Youth Arts Collective"
};
