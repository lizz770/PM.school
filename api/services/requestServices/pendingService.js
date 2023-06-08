import prisma from "../../constants/config.js";

const pendingService = async (req, res, next) => {
  const { user, skip, take } = req.query;

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
      let sent = await prisma.userRelationship.findMany({
        where: {
          senderId: loggedInUser.id,
          status: "PENDING",
        },
        select: {
          tutor: {
            select: {
              firstName: true,
              lastName: true,
              userRole: true,
            },
          },
          status: true,
          id: true,
        },
      });

      sent = sent.map((item) => {
        return {
          ...item.tutor,
          status: item.status,
          id: item.id,
        };
      });

      let received = await prisma.userRelationship.findMany({
        where: {
          studentId: loggedInUser.id,
          status: "PENDING",
          NOT: {
            senderId: loggedInUser.id,
          },
        },
        select: {
          tutor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          status: true,
          id: true,
        },
      });

      received = received.map((item) => {
        return {
          ...item.tutor,
          status: item.status,
          id: item.id,
        };
      });

      return res.status(200).json({ sent, received });
    } catch (e) {
      return res.status(400).json({ message: e?.message });
    }

  if (loggedInUser.userRole === "TUTOR")
    try {
      let sent = await prisma.userRelationship.findMany({
        where: {
          senderId: loggedInUser.id,
          status: "PENDING",
        },
        select: {
          student: {
            select: {
              firstName: true,
              lastName: true,
              userRole: true,
            },
          },
          status: true,
          id: true,
        },
      });

      sent = sent.map((item) => {
        return {
          ...item.student,
          status: item.status,
          id: item.id,
        };
      });

      let received = await prisma.userRelationship.findMany({
        where: {
          tutorId: loggedInUser.id,
          status: "PENDING",
          NOT: {
            senderId: loggedInUser.id,
          },
        },
        select: {
          student: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          status: true,
          id: true,
        },
      });

      received = received.map((item) => {
        return {
          ...item.student,
          status: item.status,
          id: item.id,
        };
      });

      return res.status(200).json({ sent, received });
    } catch (e) {
      return res.status(400).json({ message: e?.message });
    }
};

export default pendingService;
