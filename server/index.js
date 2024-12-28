import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import cors from 'cors';
import socketHandlers from './src/socket/socket.handlers.js';
import routes from './src/routes/index.js';
import connectToMongodb from './src/db/connectToMongodb.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 9000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const CORS_OPTIONS = {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
}

const app = express();
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: CORS_OPTIONS,
});

app.use(express.json());
app.use(cookieParser());

app.use(cors(CORS_OPTIONS));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(routes());

socketHandlers(io);

server.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
