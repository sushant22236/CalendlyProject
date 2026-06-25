import express from 'express';
import userRoutes from './routes/user.route';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: "okay",
        message: "server is up"
    })
});

app.use('/api', userRoutes);

app.use(errorHandler);

export { app };