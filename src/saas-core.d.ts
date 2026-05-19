export declare function validateSaasDefinition(saas: any): boolean;
export declare function createSaasWorkspace(saas: any, now?: string): {
    version: string;
    createdAt: string;
    updatedAt: string;
    account: {
        workspaceName: string;
        owner: string;
        segment: any;
        plan: any;
        launchStage: string;
    };
    metrics: any;
    playbooks: any;
    controls: any;
    roadmap: any;
};
export declare function calculateSaasReadiness(saas: any, workspace: any): {
    score: number;
    label: string;
    metricScore: number;
    playbookScore: number;
    controlScore: number;
    roadmapScore: number;
    readyPlaybooks: any;
    verifiedControls: any;
    warnings: any[];
};
export declare function saasWarnings(score: any, controlScore: any, workspace: any): any[];
export declare function applySaasSample(saas: any): {
    version: string;
    createdAt: string;
    updatedAt: string;
    account: {
        workspaceName: string;
        owner: string;
        segment: any;
        plan: any;
        launchStage: string;
    };
    metrics: any;
    playbooks: any;
    controls: any;
    roadmap: any;
};
export declare function buildSaasExecutiveBrief(config: any, saas: any, workspace: any): string;
export declare function buildSaasCsv(workspace: any): string;
