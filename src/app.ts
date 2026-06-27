import express from 'express';
import userRoutes from './routes/user.route';
import { errorHandler } from './middlewares/error.middleware';
import { routeNotFound } from './middlewares/route-not-found';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: "okay",
        message: "server is up"
    })
});

app.use('/api', userRoutes);

app.use(routeNotFound);
app.use(errorHandler);

export { app };