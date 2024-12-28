
import { login, logout, signup } from '../controllers/auth.controller.js';

export default (router) => {
    router.post('/api/auth/signup', signup);
    router.post('/api/auth/login', login);
    router.post('/api/auth/logout', logout);
}
