import express from 'express';
import userRoutes from './routes/user.route';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: "okay",
        message: "server is up"
    })
});

app.use('/api', userRoutes);

export { app };