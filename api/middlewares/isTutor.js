import prisma from "../constants/config.js";

const isTutor = async (req, res, next) => {
  try {
    const isTutor = await prisma.user.findUnique({
      where: {
        id: req?.session?.userId,
      },
    });

    if (isTutor?.userRole === "TUTOR" && isTutor?.id) next();
    else return res.status(401).json({ message: "Вы не учитель" });
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Что то пошло не так" });
  }
};

export default isTutor;
