import prisma from "../../constants/config.js";

const postService = async (req, res, next) => {
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

  const { tutorId, studentId } = req.body;

  if (loggedInUser.userRole === "STUDENT") {
    if (tutorId === req.session.userId) {
      res.status(400).json({ error: `Не удается отправить запрос самому себе` });
      return;
    }

    try {
      const alreadySent = await prisma.userRelationship.findFirst({
        where: {
          senderId: loggedInUser.id,
          tutorId: tutorId,
          studentId: loggedInUser.id,
        },
      });
      if (alreadySent) {
        return res
          .status(400)
          .json({ error: `Уже отправили запрос ${alreadySent.id}` });
      }
    } catch (e) {
      return res.status(400).json({ error: `Не удается отправить запрос` });
    }

    try {
      const sent = await prisma.userRelationship.create({
        data: {
          senderId: loggedInUser.id,
          tutorId: tutorId,
          studentId: loggedInUser.id,
          status: "PENDING",
        },
      });
      return res.status(200).json({ message: `Отправлено: ${sent.id}` });
    } catch (e) {
      return res.status(400).json({ error: `Не удается отправить запрос` });
    }
  }
  if (loggedInUser.userRole === "TUTOR") {
    if (studentId === req.session.userId) {
      res.status(400).json({ error: `Не удается отправить запрос самому себе` });
      return;
    }
    try {
      const alreadySent = await prisma.userRelationship.findFirst({
        where: {
          senderId: loggedInUser.id,
          tutorId: loggedInUser.id,
          studentId: studentId,
        },
      });
      if (alreadySent) {
        return res
          .status(400)
          .json({ error: `Уже отправили запрос ${alreadySent.id}` });
      }
    } catch (e) {
      return res.status(400).json({ error: `Не удается отправить запрос` });
    }

    try {
      const sent = await prisma.userRelationship.create({
        data: {
          senderId: loggedInUser.id,
          tutorId: loggedInUser.id,
          studentId: studentId,
          status: "PENDING",
        },
      });
      return res.status(200).json({ message: `Отправлено: ${sent.id}` });
    } catch (e) {
      return res.status(400).json({ error: `Не удается отправить запрос` });
    }
  }

  return res.status(400).json({ error: `Неавторизованная отправка запроса` });
};

export default postService;
