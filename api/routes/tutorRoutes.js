import { Router } from "express";
import * as tutorController from "../controllers/tutorController.js";
import isTutor from "../middlewares/isTutor.js";
import requiresAuth from "../middlewares/requiresAuth.js";
import validateRequestBody from "../middlewares/validateBody.js";
import postPrescriptionSchema from "../schemas/prescriptionSchemas/postPrescriptionSchema.js";

const router = Router();
const TUTOR_PATH = "/student";
router.use(requiresAuth);
router.use(isTutor);

router.get(`${TUTOR_PATH}/overview`, tutorController.studentOverview);
router.get(`${TUTOR_PATH}/mediadesign`, tutorController.studentMediadesign);
router.get(
  `${TUTOR_PATH}/photoproduction`,
  tutorController.studentPhotoProduction
);
router.get(`${TUTOR_PATH}/videoproduction`, tutorController.studentVideoProduction);

router.get(
  `${TUTOR_PATH}/prescriptions`,
  tutorController.studentPrescriptions
);
router.post(
  `${TUTOR_PATH}/prescription`,
  validateRequestBody(postPrescriptionSchema),
  tutorController.poststudentPrescription
);
router.delete(
  `${TUTOR_PATH}/prescription`,
  tutorController.deletestudentPrescription
);

export default router;
