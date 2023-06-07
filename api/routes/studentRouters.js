import {Router} from 'express';

//контролерры
import * as measurementController from "../controllers/measurementController.js";

//схемы
import mediaDesignSchema from '../schemas/measurementSchemas/mediaDesignSchema.js';
import photoProductionSchema from '../schemas/measurementSchemas/photoProductionSchema.js';
import videoProductionSchema from '../schemas/measurementSchemas/videoProductionSchema.js'
//промежуточные слои 
import isStudent from '../middlewares/isStudent.js';
import requireAuth from "../middlewares/requiresAuth.js"
import validateRequestBody from "../middlewares/validateBody.js"

const router=Router();
const M_PREFIX="/measurement";
const MEDIADESIGN_PATH="mediadesign";
const PHOTOPRODUCTION_PATH ="photoproduction";
const VIDEODRODUCTION_PATH="videoproduction";


router.use(requireAuth);

router.post(
    `${M_PREFIX}/${MEDIADESIGN_PATH}`,
    isStudent,
    validateRequestBody(mediaDesignSchema),
    measurementController.postMediaDesign
);

router.get(
    `${M_PREFIX}/${MEDIADESIGN_PATH}`,
    isStudent,
    measurementController.getMediaDesign
);
router.delete(
    `${M_PREFIX}/${MEDIADESIGN_PATH}`,
    isStudent,
    measurementController.deleteMediaDesign
);

//PHOTO
router.post(
    `${M_PREFIX}/${PHOTOPRODUCTION_PATH}`,
    isStudent,
    validateRequestBody(photoProductionSchema),
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

//VIDEO
router.post(
    `${M_PREFIX}/${VIDEODRODUCTION_PATH}`,
    isStudent,
    validateRequestBody(videoProductionSchema),
    measurementController.postVideoProduction
);
router.get(
    `${M_PREFIX}/${VIDEODRODUCTION_PATH}`,
    isStudent,
    measurementController.getVideoProduction
);
router.delete(
    `${M_PREFIX}/${VIDEODRODUCTION_PATH}`,
    isStudent,
    measurementController.deleteVideoProduction
);

export default router;