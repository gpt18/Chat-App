import express from 'express';
import AuthRoutes from './auth.routes.js';
import MessageRoutes from './message.routes.js';

const router = express.Router();

export default () => {

    AuthRoutes(router);

    MessageRoutes(router);

    return router;
}