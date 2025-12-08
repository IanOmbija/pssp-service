import app from './app';

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`PSSP Service listening on localhost port: ${PORT}`);
});