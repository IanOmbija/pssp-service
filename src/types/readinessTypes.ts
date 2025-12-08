export type ComponentScores = {
    academics?: number | null;
    career_skills?: number | null;
    life_skills?: number | null;
    [key: string]: number | null | undefined;
};


export type ReadinessReq  = {
    learner_id?: string | number;
    timestamp? : string;
    scores: ComponentScores;
    metadata?:  Record<string,any>;
};

export type ReadinessResp = {
    readiness_score: number;
    readiness_label: 'Beginner' | 'Building' | 'Ready';
    component_scores: ComponentScores;
    recommendation: string;
    risk_flags: string[];
};