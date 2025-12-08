import { Router } from "express";
import validator from '../utils/validator';
import { calculateReadiness} from '../services/readinessScorer';

const router = Router();

router.post('/', (req, res) => {
    const { valid, errors } = validator.validateReadinessPayload(req.body);
    if(!valid) return res.status(400).json({ errors });

    const { scores } = req.body;

    try {
        const result = calculateReadiness(scores);
        return res.json(result);

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Error calculating readiness' });
    }
});

export default router;