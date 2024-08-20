import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connect from './database/conn.js';
import router from './router/route.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080; // Ensure the port is defined with a fallback

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // Less hackers know about our stack

/** Serve static files from the React app */
app.use(express.static(path.join(__dirname, '../client/build')));

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

/** API Routes */
app.use('/api', router);

// 404 Error Handler: Catch all undefined routes and serve a 404 page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Export the app as an ES module
export default app;

/** Start server only when we have a valid database connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Error starting the server:", error);
    }
}).catch(error => {
    console.log("Invalid database connection:", error);
});
