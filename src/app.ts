import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json({
        status: "okay",
        message: "server is up"
    })
});

export { app };