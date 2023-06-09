import * as mediadesignServices from "../services/studentServices/measurementServices/MediaDesignService.js";
import * as photoProductionServices from "../services/studentServices/measurementServices/PhotoProductionService.js";
import * as videoProductionServices from "../services/studentServices/measurementServices/VideoProductionService.js";

const postMediadesign = async (req, res, next) => {
  await mediadesignServices.postMediadesign(req, res, next);
};

const getMediadesign = async (req, res, next) => {
  await mediadesignServices.getMediadesign(req, res, next);
};

const deleteMediadesign = async (req, res, next) => {
  await mediadesignServices.deleteMediadesign(req, res, next);
};

const postPhotoProduction = async (req, res, next) => {
  await photoProductionServices.postPhotoProduction(req, res, next);
};

const getPhotoProduction = async (req, res, next) => {
  await photoProductionServices.getPhotoProduction(req, res, next);
};

const deletePhotoProduction = async (req, res, next) => {
  await photoProductionServices.deletePhotoProduction(req, res, next);
};

const postVideoProduction = async (req, res, next) => {
  await videoProductionServices.postVideoProduction(req, res, next);
};

const getVideoProduction = async (req, res, next) => {
  await videoProductionServices.getVideoProduction(req, res, next);
};

const deleteVideoProduction = async (req, res, next) => {
  await videoProductionServices.deleteVideoProduction(req, res, next);
};

export {
  postMediadesign,
  getMediadesign,
  deleteMediadesign,

  postPhotoProduction,
  getPhotoProduction,
  deletePhotoProduction,
  
  postVideoProduction,
  getVideoProduction,
  deleteVideoProduction,
};
