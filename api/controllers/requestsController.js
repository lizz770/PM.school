import searchService from "../services/requestServices/searchService.js";
import pendingService from "../services/requestServices/pendingService.js";
import cancelService from "../services/requestServices/cancelService.js";
import deleteService from "../services/requestServices/deleteService.js";
import acceptService from "../services/requestServices/acceptService.js";
import postService from "../services/requestServices/postService.js";

const search = async (req, res, next) => {
  await searchService(req, res, next);
};

const pending = async (req, res, next) => {
  await pendingService(req, res, next);
};

const cancel = async (req, res, next) => {
  await cancelService(req, res, next);
};

const decline = async (req, res, next) => {
  await deleteService(req, res, next);
};

const accept = async (req, res, next) => {
  await acceptService(req, res, next);
};

const post = async (req, res, next) => {
  await postService(req, res, next);
};

export { search, pending, cancel, decline, accept, post };
