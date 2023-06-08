import prisma from "../../constants/config.js";

const searchService = async (req, res, next) => {
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
      const searchResults = await prisma.user.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: user,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: user,
                mode: "insensitive",
              },
            },
          ],
          NOT: {
            Students: {
              some: {
                studentId: loggedInUser.id,
              },
            },
          },
          userRole: "TUTOR",
        },

        select: {
          id: true,
          firstName: true,
          lastName: true,
          userRole: true,
          email: true,
        },
        take: take ? parseInt(take) : 10,
        skip: skip ? parseInt(skip) : 0,
      });

      return res.status(200).json({ searchResults });
    } catch (e) {
      return res.status(400).json({ message: e?.message });
    }

  if (loggedInUser.userRole === "TUTOR")
    try {
      const searchResults = await prisma.user.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: user,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: user,
                mode: "insensitive",
              },
            },
            {
              userRole: "STUDENT",
            },
          ],
          NOT: {
            Tutors: {
              some: {
                tutorId: loggedInUser.id,
              },
            },
          },
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          userRole: true,
          email: true,
        },
        take: take ? parseInt(take) : 10,
        skip: skip ? parseInt(skip) : 0,
      });

      return res.status(200).json({ searchResults });
    } catch (e) {
      return res.status(400).json({ message: e?.message });
    }
  else {
    return res.status(400).json({ message: "Недопустимая роль пользователя" });
  }
};

export default searchService;
