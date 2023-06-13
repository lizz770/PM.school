import { Router } from "express";

//Схемы
import mediadesignSchema from "../schemas/measurementSchemas/mediadesignSchema.js";
import photoProductionSchema  from "../schemas/measurementSchemas/photoProductionSchema.js";
import videoProductionSchema from "../schemas/measurementSchemas/videoProductionSchema.js";

//контроллеры
import * as studentController from "../controllers/studentController.js";
import * as measurementController from "../controllers/measurementController.js";


import isStudent from "../middlewares/isStudent.js";
import requiresAuth from "../middlewares/requiresAuth.js";
import validateRequestBody from "../middlewares/validateBody.js";

const router = Router();
const STUDENT_PATH = "/tutor";
const M_PREFIX = "/measurement";
const MEDIADESIGN_PATH = "mediadesign";
const PHOTOPRODUCTION_PATH = "photoproduction";
const VIDEOPRODUCTION_PATH = "videoproduction";

router.use(requiresAuth);

router.post(
  `${M_PREFIX}/${MEDIADESIGN_PATH}`,
  isStudent,
  validateRequestBody(mediadesignSchema),
  measurementController.postMediadesign
);

router.get(
  `${M_PREFIX}/${MEDIADESIGN_PATH}`,
  isStudent,
  measurementController.getMediadesign
);

router.delete(
  `${M_PREFIX}/${MEDIADESIGN_PATH}`,
  isStudent,
  measurementController.deleteMediadesign
);

router.post(
  `${M_PREFIX}/${PHOTOPRODUCTION_PATH}`,
  isStudent,
  validateRequestBody(photoProductionSchema ),
  measurementController.postPhotoProduction
);

router.get(
  `${M_PREFIX}/${PHOTOPRODUCTION_PATH}`,
  isStudent,
  measurementController.getPhotoProduction
);

router.delete(
  `${M_PREFIX}/${PHOTOPRODUCTION_PATH}`,
  isStudent,
  measurementController.deletePhotoProduction
);

router.post(
  `${M_PREFIX}/${VIDEOPRODUCTION_PATH}`,
  isStudent,
  validateRequestBody(videoProductionSchema),
  measurementController.postVideoProduction
);

router.get(
  `${M_PREFIX}/${VIDEOPRODUCTION_PATH}`,
  isStudent,
  measurementController.getVideoProduction
);

router.delete(
  `${M_PREFIX}/${VIDEOPRODUCTION_PATH}`,
  isStudent,
  measurementController.deleteVideoProduction
);


router.get(
  `${STUDENT_PATH}/prescriptions`,
  isStudent,
  studentController.getTutorPrescriptions
);

router.delete(
  `${STUDENT_PATH}/prescription`,
  isStudent,
  studentController.deleteTutorPrescription
);

router.patch(
  `${STUDENT_PATH}/prescription`,
  isStudent,
  studentController.patchTutorPrescription
);

export default router;
