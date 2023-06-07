import * as MediaDesignService from "../services/studentServices/measurementServices/MediaDesignService.js";
import * as PhotoProductionService from "../services/studentServices/measurementServices/PhotoProductionService.js"
import * as VideoProductionService from "../services/studentServices/measurementServices/VideoProductionService.js"

//ПОСТ
const postMediaDesign = async(req,res)=>{
    await MediaDesignService.postMediaDesign(req,res);
};
const postPhotoProduction = async(req,res)=>{
    await PhotoProductionService.postPhotoProduction(req,res);
};
const postVideoProduction = async(req,res)=>{
    await VideoProductionService.postVideoProduction(req,res);
};

//Гет
const getMediaDesign = async(req, res, next)=>{
    await MediaDesignService.getMediaDesign(req, res, next);
};
const getPhotoProduction = async(req, res, next)=>{
    await PhotoProductionService.getPhotoProduction(req, res, next);
};
const getVideoProduction = async(req, res, next)=>{
    await VideoProductionService.getVideoProduction(req, res, next);
};

//delete
const deleteMediaDesign = async(req, res, next)=>{
    await MediaDesignService.deleteMediaDesign(req, res, next);
};
const deletePhotoProduction = async(req, res, next)=>{
    await PhotoProductionService.deletePhotoProduction(req, res, next);
};
const deleteVideoProduction = async(req, res, next)=>{
    await VideoProductionService.deleteVideoProduction(req, res, next);
};

export {
    postMediaDesign,
    getMediaDesign,
    deleteMediaDesign,

    postPhotoProduction,
    getPhotoProduction,
    deletePhotoProduction,
    
    postVideoProduction,
    getVideoProduction,
    deleteVideoProduction,
};