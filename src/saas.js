export const saas = {
    "productName": "Proposal Brief Builder",
    "category": "Finance & Grants",
    "northStar": "proposal sections supported by verified facts",
    "segments": [
        "Grant writers",
        "Nonprofit program leads",
        "Student writing pods",
        "Foundation consultants"
    ],
    "jobs": [
        "Turn discovery notes into structured proposal briefs",
        "Link every claim to evidence before drafting",
        "Align problem, program, outcomes, and budget",
        "Hand off writer-ready packets without hallucinated claims"
    ],
    "plans": [
        {
            "name": "Community",
            "price": "Free",
            "promise": "Single proposal brief and evidence appendix"
        },
        {
            "name": "Writer",
            "price": "49/mo",
            "promise": "Claim-evidence graph, reviewer comments, brief versions"
        },
        {
            "name": "Chapter",
            "price": "199/mo",
            "promise": "Team drafting pipeline and mentor approvals"
        },
        {
            "name": "Consulting",
            "price": "Custom",
            "promise": "Client-ready proposal operation workspace"
        }
    ],
    "metrics": [
        {
            "label": "Evidence-backed claims",
            "current": 88,
            "target": 100,
            "note": "Critical claims with source notes"
        },
        {
            "label": "Narrative completeness",
            "current": 74,
            "target": 90,
            "note": "Required proposal sections drafted"
        },
        {
            "label": "Budget alignment",
            "current": 69,
            "target": 90,
            "note": "Activities tied to budget lines"
        },
        {
            "label": "Reviewer comments resolved",
            "current": 61,
            "target": 85,
            "note": "Open mentor concerns closed"
        }
    ],
    "playbooks": [
        "Discovery note cleanup",
        "Claim-evidence mapping",
        "Outcome and metric alignment",
        "Budget narrative handoff",
        "Reviewer approval cycle"
    ],
    "integrations": [
        "Google Docs brief export",
        "Drive evidence binder",
        "Budget Narrative Studio link",
        "Grammarly/editorial checklist",
        "Funder template library"
    ],
    "controls": [
        "Unsupported claims are blocked from certified packet",
        "Outcome claims need metric/source pairs",
        "Budget ask must match activities",
        "Confidential notes stay out of owner-safe exports"
    ],
    "roadmap": [
        "Claim-evidence graph UI",
        "Funder template adapters",
        "Versioned reviewer redlines",
        "Outcome-library suggestions",
        "Budget narrative cross-check"
    ],
    "personas": [
        {
            "name": "Proposal strategist",
            "role": "Turns discovery notes into funder-ready briefs",
            "pain": "Claims and evidence are disconnected",
            "success": "Every claim is source-backed and section-ready",
            "activation": "Create evidence lockbox entry"
        },
        {
            "name": "Program lead",
            "role": "Validates program facts, outcomes, and scope",
            "pain": "Drafts drift from actual program capacity",
            "success": "Program facts, budget, and outcomes reconcile",
            "activation": "Review claim-evidence map"
        },
        {
            "name": "Grant writer",
            "role": "Uses brief to draft narrative quickly",
            "pain": "Handoff packets lack structure and reviewer notes",
            "success": "Receives section-by-section brief with risks and citations",
            "activation": "Export proposal brief packet"
        }
    ],
    "journeys": [
        {
            "stage": "Discovery intake",
            "moment": "Capture problem, population, program model, and evidence sources",
            "success": "Raw notes converted to structured facts",
            "automation": "Guided intake prompts"
        },
        {
            "stage": "Claim mapping",
            "moment": "Link each narrative claim to source evidence",
            "success": "Unsupported claims are visible before export",
            "automation": "Claim-evidence graph"
        },
        {
            "stage": "Budget alignment",
            "moment": "Connect activities to costs and narrative justifications",
            "success": "Budget and scope assumptions reconcile",
            "automation": "Budget consistency checker"
        },
        {
            "stage": "Reviewer redline",
            "moment": "Route gaps, risks, and approvals to stakeholders",
            "success": "Reviewer comments resolved with rationale",
            "automation": "Reviewer queue"
        },
        {
            "stage": "Brief export",
            "moment": "Generate funder-ready handoff packet",
            "success": "Writer receives section-ready, client-safe brief",
            "automation": "Markdown/CSV export bundle"
        }
    ],
    "features": [
        {
            "name": "Evidence lockbox",
            "tier": "Community",
            "description": "Structured source repository for facts, quotes, and statistics",
            "evidence": "Sources require owner, date, and use permission"
        },
        {
            "name": "Claim-evidence graph",
            "tier": "Team",
            "description": "Maps every proposal claim to verified source material",
            "evidence": "Unsupported claims block certification"
        },
        {
            "name": "Section brief generator",
            "tier": "Team",
            "description": "Problem, program, outcomes, budget, and sustainability sections",
            "evidence": "Each section lists facts, claims, and missing inputs"
        },
        {
            "name": "Budget/outcome consistency checks",
            "tier": "Chapter",
            "description": "Flags mismatched units, costs, and promised outcomes",
            "evidence": "Mismatch notes include reviewer rationale"
        },
        {
            "name": "Reviewer redline workflow",
            "tier": "Chapter",
            "description": "Stakeholder comments, approvals, and risk dispositions",
            "evidence": "Resolved comments preserve reviewer and timestamp"
        },
        {
            "name": "Funder-specific brief variants",
            "tier": "Network",
            "description": "Reusable templates by funder interest and proposal type",
            "evidence": "Template assumptions documented per export"
        }
    ],
    "experiments": [
        {
            "hypothesis": "Claim graphs reduce unsupported narrative edits",
            "measure": "Unsupported claims",
            "target": "0 unsupported claims at export",
            "cadence": "per proposal"
        },
        {
            "hypothesis": "Section templates reduce writer handoff time",
            "measure": "Brief completion time",
            "target": "50% faster kickoff",
            "cadence": "monthly"
        },
        {
            "hypothesis": "Budget consistency checks prevent review rework",
            "measure": "Budget narrative mismatches",
            "target": "0 critical mismatches",
            "cadence": "per proposal"
        },
        {
            "hypothesis": "Reviewer redlines improve approval readiness",
            "measure": "Reviewer approval rate",
            "target": "90% approved",
            "cadence": "per proposal"
        }
    ],
    "risks": [
        {
            "risk": "Unsupported claims enter final proposal",
            "mitigation": "Claim-evidence graph blocks export until sourced",
            "owner": "Proposal strategist",
            "severity": "high"
        },
        {
            "risk": "Sensitive beneficiary stories leak to funders",
            "mitigation": "Consent and redaction labels in evidence lockbox",
            "owner": "Program lead",
            "severity": "high"
        },
        {
            "risk": "Budget and program scope diverge",
            "mitigation": "Budget/outcome consistency checks",
            "owner": "Finance reviewer",
            "severity": "high"
        },
        {
            "risk": "Reviewer comments are lost before handoff",
            "mitigation": "Redline workflow with resolved rationale",
            "owner": "Grant writer",
            "severity": "medium"
        }
    ],
    "automations": [
        {
            "name": "Evidence prompt generator",
            "trigger": "New proposal section started",
            "action": "List missing sources and owner questions",
            "owner": "Proposal strategist"
        },
        {
            "name": "Unsupported claim blocker",
            "trigger": "Claim lacks evidence link",
            "action": "Flag section and block certified export",
            "owner": "Program lead"
        },
        {
            "name": "Budget mismatch detector",
            "trigger": "Budget line item changes",
            "action": "Recheck narrative quantities and outcomes",
            "owner": "Finance reviewer"
        },
        {
            "name": "Writer handoff packet",
            "trigger": "All claims and controls verified",
            "action": "Export section-ready brief and CSV source map",
            "owner": "Grant writer"
        }
    ],
    "dashboards": [
        {
            "name": "Brief readiness",
            "audience": "Proposal team",
            "widgets": [
                "Section completion",
                "Unsupported claims",
                "Reviewer comments",
                "Budget alignment"
            ]
        },
        {
            "name": "Evidence lockbox",
            "audience": "Program leads",
            "widgets": [
                "Source freshness",
                "Consent status",
                "Missing facts",
                "Sensitive stories"
            ]
        },
        {
            "name": "Writer handoff",
            "audience": "Grant writers",
            "widgets": [
                "Ready sections",
                "Risk notes",
                "Citation map",
                "Open questions"
            ]
        }
    ],
    "templates": [
        {
            "name": "Proposal brief packet",
            "format": "Markdown",
            "sections": [
                "Problem",
                "Program model",
                "Evidence",
                "Budget alignment",
                "Outcomes",
                "Risks"
            ]
        },
        {
            "name": "Claim-source map",
            "format": "CSV",
            "sections": [
                "Section",
                "Claim",
                "Source",
                "Permission",
                "Reviewer status"
            ]
        },
        {
            "name": "Reviewer redline agenda",
            "format": "Markdown",
            "sections": [
                "Unsupported claims",
                "Budget mismatches",
                "Story consent",
                "Final approvals"
            ]
        }
    ]
};
//# sourceMappingURL=saas.js.map