import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

export default (router) => {
    router.post('/api/message/send/:id', protectRoute, sendMessage);

}