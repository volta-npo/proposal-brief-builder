export const config = {
  "number": 13,
  "slug": "proposal-brief-builder",
  "title": "Proposal Brief Builder",
  "category": "Finance & Grants",
  "tagline": "Turn messy discovery notes into a clean grant proposal brief before anyone writes prose.",
  "persona": "Students who need to write with clarity and avoid hallucinated claims.",
  "gap": "Grant writing fails when teams start drafting before facts, outcomes, budget, and eligibility are aligned.",
  "niche": "Responsible grant writing for small nonprofits.",
  "metric": "proposal sections supported by verified facts",
  "modules": [
    "Problem statement canvas",
    "Program facts table",
    "Evidence lockbox",
    "Drafting handoff packet"
  ],
  "theme": {
    "accent": "#16a34a",
    "accent2": "#86efac",
    "emoji": "\ud83d\udcb8",
    "metricLabel": "Funding readiness",
    "workflow": [
      "Collect verified facts",
      "Map requirements to evidence",
      "Score readiness",
      "Export funder-ready packet"
    ],
    "privacy": "Financial and grant materials can be sensitive. Keep exports local and label confidential notes."
  },
  "statuses": [
    "not-started",
    "blocked",
    "in-progress",
    "ready",
    "approved"
  ],
  "criteria": [
    {
      "id": "problem-statement-canvas",
      "label": "Problem statement canvas",
      "weight": 15,
      "defaultStatus": "not-started",
      "guidance": "Implement and verify problem statement canvas with evidence that a Volta student pod, mentor, and owner can understand."
    },
    {
      "id": "program-facts-table",
      "label": "Program facts table",
      "weight": 15,
      "defaultStatus": "not-started",
      "guidance": "Implement and verify program facts table with evidence that a Volta student pod, mentor, and owner can understand."
    },
    {
      "id": "evidence-lockbox",
      "label": "Evidence lockbox",
      "weight": 15,
      "defaultStatus": "not-started",
      "guidance": "Implement and verify evidence lockbox with evidence that a Volta student pod, mentor, and owner can understand."
    },
    {
      "id": "drafting-handoff-packet",
      "label": "Drafting handoff packet",
      "weight": 15,
      "defaultStatus": "not-started",
      "guidance": "Implement and verify drafting handoff packet with evidence that a Volta student pod, mentor, and owner can understand."
    },
    {
      "id": "evidence-quality",
      "label": "Evidence quality",
      "weight": 10,
      "defaultStatus": "not-started",
      "guidance": "Attach proof, source notes, screenshots, owner confirmation, or reviewer rationale."
    },
    {
      "id": "owner-handoff",
      "label": "Owner handoff",
      "weight": 10,
      "defaultStatus": "not-started",
      "guidance": "Make the output understandable and maintainable by a nontechnical owner."
    },
    {
      "id": "mission-alignment",
      "label": "Mission alignment",
      "weight": 10,
      "defaultStatus": "not-started",
      "guidance": "Show how this advances digital equity, student growth, or pro bono delivery."
    },
    {
      "id": "qa-safety",
      "label": "QA and safety",
      "weight": 10,
      "defaultStatus": "not-started",
      "guidance": "Resolve privacy, accessibility, accuracy, and operational risks before handoff."
    }
  ],
  "templates": {
    "actions": [
      "Run a real Volta scenario for Proposal Brief Builder and capture baseline evidence.",
      "Complete the problem statement canvas workflow with owner-safe notes.",
      "Resolve all blocked rubric items and add evidence for every ready item.",
      "Export the handoff packet and review it with a mentor before client use."
    ]
  },
  "sample": {
    "clientName": "Eastside Youth Arts Collective",
    "chapter": "NYC",
    "studentLead": "Volta Student Lead",
    "notes": "Grant and finance readiness project for a small community nonprofit. Proposal Brief Builder sample.",
    "evidencePrefix": "Proposal Brief Builder",
    "evidence": [
      "Discovery call notes captured with owner confirmation.",
      "Public digital footprint reviewed and summarized.",
      "Mentor QA comments attached before handoff."
    ]
  }
};
