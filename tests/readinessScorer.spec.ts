import { calculateReadiness } from "../src/services/readinessScorer";

describe('readinessScorer', () => {
    it('calculates the weighted average and labels correctly', () => {
        const res = calculateReadiness({ academics: 80, career_skills: 60, life_skills: 70 });

        // the weighted calculations should be
        // weighted: 80*0.4 + 60*0.35 + 70*0.25 = 32 + 21 + 17.5 = 70.5
        expect(res.readiness_score).toBe(70.5);
        expect(res.readiness_label).toBe('Building');
        expect(res.risk_flags).not.toContain('career_skills');
    });

    it('handles the missing components by inputing the default value defined', () => {
        const res = calculateReadiness({ academics: 85 } as any);

        // academics value is set to 85, therefore the rest will be set to default values
        // career/default 50, life default 50
        // calculations: 85*0.4 + 50*0.35 + 50*0.25 = 36 + 17.5 + 12.5 = 64
        expect(res.readiness_score).toBe(64);
        expect(res.readiness_label).toBe('Building');
    });

    it('labels Ready at boundary 75', () => {
        // scores to produce 75
        const res = calculateReadiness({ academics: 100, career_skills: 50, life_skills: 50 });

        //weighted: 100*0.4 + 50*0.35 + 50*0.25 = 40 + 17.5 + 12.5 = 70 which equals to not ready
        expect(res.readiness_label).toBe('Building');
    });
});

