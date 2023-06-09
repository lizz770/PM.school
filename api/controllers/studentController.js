import * as tutorPrescriptionsService from "../services/studentServices/tutorPrescriptions.js";


const getTutorPrescriptions = async (req, res, next) => {
  await tutorPrescriptionsService.getTutorPrescriptions(req, res, next);
};

const deleteTutorPrescription = async (req, res, next) => {
  await tutorPrescriptionsService.deleteTutorPrescription(req, res, next);
};

const patchTutorPrescription = async (req, res, next) => {
  await tutorPrescriptionsService.patchTutorPrescription(req, res, next);
};

export {
  getTutorPrescriptions,
  deleteTutorPrescription,
  patchTutorPrescription,
};
