import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = process.env.PORT || 3000;

/** Serve static files from the React app */
app.use(express.static(path.join(__dirname, 'client/build')));

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

/** API Routes */
app.use('/api', router);

/** All other routes should serve the React app */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

/** Start server only when we have a valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log("Invalid database connection...!");
});
