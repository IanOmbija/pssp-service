import request from 'supertest';
import app from '../src/app';

describe('/api/readiness', () => {
    it('returns 400 for missing scores', async () => {
        const res = await request(app).post('/api/readiness').send({});
        expect(res.status).toBe(400);
    });

    it('returns readiness response for valid payload', async () => {
        const payload = {scores: { academics: 85, career_skills: 60, life_skills: 70 }};
        const res = await request(app).post('/api/readiness').send(payload);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('readiness_score');
        expect(res.body).toHaveProperty('recommendation');
    });
});