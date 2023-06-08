import prisma from "../../constants/config.js";

const acceptService = async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Не указан id" });
  }

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

  if (loggedInUser.userRole === "STUDENT")
    try {
      const accepted = await prisma.userRelationship.updateMany({
        where: {
          id: id,
          studentId: loggedInUser.id,
        },
        data: {
          status: "ACCEPTED",
        },
      });
      if (!accepted)
        return res
          .status(400)
          .json({ error: `Неавторизированное обновление по ID: ${id}` });

      return res.status(200).json({ message: `Принято: ${id}` });
    } catch (e) {
      return res
        .status(400)
        .json({ error: `Не удается обновить запрос с помощью ID: ${id}` });
    }

  if (loggedInUser.userRole === "TUTOR")
    try {
      const accepted = await prisma.userRelationship.updateMany({
        where: {
          id: id,
          tutorId: loggedInUser.id,
        },
        data: {
          status: "ACCEPTED",
        },
      });
      if (!accepted)
        return res
          .status(400)
          .json({ error: `Неавторизированное обновление по ID: ${id}` });

      return res.status(200).json({ message: `Принято: ${id}` });
    } catch (e) {
      return res
        .status(400)
        .json({ error: `Не удается обновить запрос с помощью ID: ${id}` });
    }

  return res.status(400).json({ error: "Неавторизованный" });
};

export default acceptService;
