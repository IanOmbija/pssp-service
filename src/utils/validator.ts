import { ReadinessReq } from "../types/readinessTypes";

export function validateReadinessPayload(body: any): { valid: boolean; errors?: string[] }  {
    if (!body || typeof body !== 'object') return {valid: false, errors: ['Ensure the body is a JSON object']};
    if (!body.scores || typeof body.scores !== 'object') return { valid: false, errors: ['Scores object is required'] };

    // checking if the provides scores are numbers
    for (const [k,v] of Object.entries(body.scores)) {
        if (v == null) continue;
        if (typeof v !== 'number' || Number.isNaN(v)) return { valid: false, errors: [`Score '${k}' must be a number`] };
    }

    return {valid: true};
}

export default { validateReadinessPayload };