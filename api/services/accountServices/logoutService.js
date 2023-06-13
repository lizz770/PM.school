import prisma from "../../constants/config.js";

const logoutService = async (req, res, next) => {
  try {
    if (req?.session?.userId) {
      req.session.destroy();
      return res.status(401).json({
        message: "Успешно вышли из системы",
      });
    } else {
      return res.status(401).json({
        message: "Уже вышли из системы",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "Что-то пошло не так в logoutService",
    });
  }
};

export default logoutService;
