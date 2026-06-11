import {app} from './app';
import {PORT} from './config/env';

export function startServer() {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
}

startServer();



