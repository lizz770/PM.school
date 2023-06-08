import prisma from "../../constants/config.js";

const deleteService = async (req, res, next) => {
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
        email: true,
      },
    });
  } catch (e) {
    return res.status(400).json({ message: e?.message });
  }

  if (loggedInUser.userRole === "STUDENT") {
    try {
      const declined = await prisma.userRelationship.deleteMany({
        where: {
          id: id,
          studentId: req.session.userId,
          status: "PENDING",
        },
      });
      return res.status(200).json({ message: "Удалить" });
    } catch (e) {
      return res
        .status(400)
        .json({ error: `Невозможно удалить запрос с  ID: ${id}` });
    }
  }
  if (loggedInUser.userRole === "TUTOR")
    try {
      const declined = await prisma.userRelationship.deleteMany({
        where: {
          id: id,
          tutorId: req.session.userId,
          status: "PENDING",
        },
      });
      return res.status(200).json({ message: "Удалить" });
    } catch (e) {
      return res
        .status(400)
        .json({ error: `Невозможно удалить запрос с  ID: ${id}` });
    }
  else {
    return res
      .status(400)
      .json({ error: `Невозможно удалить запрос с  ID: ${id}` });
  }
};

export default deleteService;
