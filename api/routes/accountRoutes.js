import { Router } from "express";
import * as accountController from "../controllers/accountController.js";
import validateRequestBody from "../middlewares/validateBody.js";
import loginSchema from "../schemas/accountSchemas/loginSchema.js";
import registerSchema from "../schemas/accountSchemas/registerSchema.js";
import requiresAuth from "../middlewares/requiresAuth.js";
import changePasswordSchema from "../schemas/accountSchemas/changePasswordSchema.js";

const router = Router();

router.post(
  "/register",
  validateRequestBody(registerSchema),
  accountController.register
);
router.post(
  "/login",
  validateRequestBody(loginSchema),
  accountController.login
);

router.post("/logout", accountController.logout);

router.get("/me", accountController.getAccountInfo);

router.delete("/me/delete", requiresAuth, accountController.deleteAccount);

router.get("/me/home", requiresAuth, accountController.getHomeStats);

router.patch(
  "/me/password",
  requiresAuth,
  validateRequestBody(changePasswordSchema),
  accountController.changePassword
);

export default router;
