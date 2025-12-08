import express from 'express';
import readinessController from './controllers/readinessController';
import healthController from './controllers/healthController';

const app = express();
app.use(express.json());

app.use('/api/health', healthController);
app.use('/api/readiness', readinessController);


// Simple Error Handler here
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(err.status || 500).json({error: err.message || 'Internal Server Error'});
});

export default app;
