import { ComponentScores, ReadinessResp } from "../types/readinessTypes";
import { WEIGHTS, THRESHOLD, DEFAULT } from "../utils/config";

function clamp(v: number) {
    if (Number.isNaN(v)) return DEFAULT;
    return Math.max(0, Math.min(100, v));
}

export function calculateReadiness( scoresIn: ComponentScores):
ReadinessResp {
    const keys = Object.keys(WEIGHTS);
    const normalized: Record<string, number> = {};
    
    for (const k of keys) {
        const raw = (scoresIn as any)[k];
        normalized[k] = raw == null ? DEFAULT : clamp(Number(raw));
    }

    // we do the weighted average
    let rawScore = 0;
    for (const k of keys) {
        rawScore += normalized[k] * WEIGHTS[k];
    }

    const readiness_score = Math.round(rawScore * 10) / 10;

    //labels
    let readiness_label: ReadinessResp['readiness_label'] = 'Beginner';
    if (readiness_score >= THRESHOLD.label.building) readiness_label = 'Ready';
    else if (readiness_score >= THRESHOLD.label.beginner) readiness_label = 'Building';

    const risk_flags: string[] = keys.filter((k) => normalized[k] < THRESHOLD.risk);

    // recommendation
    const sorted = keys
        .map((k) => ({ k, v: normalized[k] }))
        .sort((a, b) => a.v - b.v);

    let recommendation = '';
    if (risk_flags.length === 0 && readiness_score >= 80) {
        recommendation = 'Candidate strong across components, consider more projects or mentorship to accelerate growth.';
    } else if ( risk_flags.length === 0){
        recommendation = 'No immediate risk areas; balance focus across career and life skill modules to push to Ready.';
    } else {
        const picks = sorted.slice(0, Math.min(2,sorted.length)).map((s) => s.k.replace('_', ' '));
        recommendation = `Need to focus on ${picks.join(' and ')} to improve overall readiness.`;
    }

    const response: ReadinessResp = {
        readiness_score,
        readiness_label,
        component_scores: normalized,
        recommendation,
        risk_flags

    };

    return response;
}