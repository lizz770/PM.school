import getUsersService from "../services/trustedUsersServices/getUsers.js";
import deleteUserService from "../services/trustedUsersServices/deleteUser.js";

const getUsers = async (req, res, next) => {
  await getUsersService(req, res, next);
};

const deleteUser = async (req, res, next) => {
  await deleteUserService(req, res, next);
};

export { getUsers, deleteUser };
