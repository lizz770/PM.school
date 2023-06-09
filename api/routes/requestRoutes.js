import { Router } from "express";
import * as requestController from "../controllers/requestsController.js";
import requiresAuth from "../middlewares/requiresAuth.js";

const router = Router();
router.use(requiresAuth);

const REQUEST_PATH = "/requests";

router.get("/search", requestController.search);
router.get(`${REQUEST_PATH}/pending`, requestController.pending);
router.delete(`${REQUEST_PATH}/cancel`, requestController.cancel);
router.delete(`${REQUEST_PATH}/decline`, requestController.decline);
router.patch(`${REQUEST_PATH}/accept`, requestController.accept);
router.post(`${REQUEST_PATH}`, requestController.post);

export default router;
