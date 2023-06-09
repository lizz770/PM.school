import studentOverviewService from "../services/tutorServices/studentOverview.js";
import * as studentMeasurementServices from "../services/tutorServices/studentMeasurements.js";
import * as studentPrescriptionsServices from "../services/tutorServices/studentPrescriptions.js";

const studentOverview = async (req, res, next) => {
  await studentOverviewService(req, res, next);
};

const studentMediadesign = async (req, res, next) => {
  await studentMeasurementServices.mediadesign(req, res, next);
};

const studentPhotoProduction = async (req, res, next) => {
  await studentMeasurementServices.photoProduction(req, res, next);
};

const studentVideoProduction = async (req, res, next) => {
  await studentMeasurementServices.videoProduction(req, res, next);
};


const studentPrescriptions = async (req, res, next) => {
  await studentPrescriptionsServices.getStudentPrescriptions(req, res, next);
};

const postStudentPrescription = async (req, res, next) => {
  await studentPrescriptionsServices.postStudentPrescription(req, res, next);
};

const deleteStudentPrescription = async (req, res, next) => {
  await studentPrescriptionsServices.deleteStudentPrescription(req, res, next);
};

export {
  studentOverview,
  studentMediadesign,
  studentPhotoProduction,
  studentVideoProduction,
  studentPrescriptions,
  postStudentPrescription,
  deleteStudentPrescription,
};
