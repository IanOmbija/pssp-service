import { Router } from "express";

const router  = Router();
// checks the API status
router.get('/', (_req, res) => {
    res.json({status: 'OK', version: '0.1'});
});

export default router;