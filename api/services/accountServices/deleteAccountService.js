import prisma from "../../constants/config.js";

const deleteAccountService = async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.session.userId,
      },
    });
  } catch (e) {
    return res.status(400).json({ message: e?.message });
  }
  res.status(200).json({ message: "Успешное удаление аккаунта" });
};

export default deleteAccountService;
