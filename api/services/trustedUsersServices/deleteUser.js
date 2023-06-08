import prisma from "../../constants/config.js";

const deleteUser = async (req, res, next) => {
  const { id } = req.query;

  let loggedInUser;

  try {
    loggedInUser = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userRole: true,
      },
    });
  } catch (e) {
    return res.status(400).json({ error: "Что-то пошло не так deleteUser" });
  }

  if (loggedInUser.userRole === "STUDENT") {
    try {
      await prisma.userRelationship.deleteMany({
        where: {
          studentId: loggedInUser.id,
          tutorId: id,
        },
      });

      return res.status(200).json({ message: "Куратор удален успешно" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "Что-то пошло не так deleteUser" });
    }
  }
  if (loggedInUser.userRole === "TUTOR") {
    try {
      await prisma.userRelationship.deleteMany({
        where: {
          tutorId: loggedInUser.id,
          studentId: id,
        },
      });

      return res.status(200).json({ message: "Студент удален успешно" });
    } catch (e) {
      return res.status(400).json({ error: "Что-то пошло не так" });
    }
  }

  return res.status(400).json({ error: "Что-то пошло не так" });
};

export default deleteUser;