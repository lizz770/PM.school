import registerService from "../services/accountServices/registerService.js";
import loginService from "../services/accountServices/loginService.js";
import whoAmIService from "../services/accountServices/whoAmIService.js";
import logoutService from "../services/accountServices/logoutService.js";
import deleteAccountService from "../services/accountServices/deleteAccountService.js";
import homeStatsService from "../services/accountServices/homeStatsService.js";
import changePasswordService from "../services/accountServices/changePasswordService.js";

const register = async (req, res, next) => {
  await registerService(req, res, next);
};

const login = async (req, res, next) => {
  await loginService(req, res, next);
};

const logout = async (req, res, next) => {
  await logoutService(req, res, next);
};

const changePassword = async (req, res, next) => {
  await changePasswordService(req, res, next);
};

const getAccountInfo = async (req, res, next) => {
  await whoAmIService(req, res, next);
};

const deleteAccount = async (req, res, next) => {
  await deleteAccountService(req, res, next);
};

const getHomeStats = async (req, res, next) => {
  await homeStatsService(req, res, next);
};

export {
  register,
  login,
  getAccountInfo,
  logout,
  changePassword,
  deleteAccount,
  getHomeStats,
};
