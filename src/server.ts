import {app} from './app';
import {PORT} from './config/env';
import {connectDatabase} from './config/database';

export async function startServer() {
    await connectDatabase()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
}

startServer();



