import * as trustedUsersController from "../controllers/trustedUsersController.js";
import requiresAuth from "../middlewares/requiresAuth.js";
import { Router } from "express";

const router = Router();
router.use(requiresAuth);

const TRUSTED_USERS_PATH = "/trustedUsers";

router.get(TRUSTED_USERS_PATH, trustedUsersController.getUsers);

router.delete(TRUSTED_USERS_PATH, trustedUsersController.deleteUser);

export default router;
