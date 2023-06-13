import prisma from "../../constants/config.js";

const homeStatsService = async (req, res, next) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        userRole: true,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Something Went Wrong" });
  }

  if (user.userRole === "STUDENT") {
    try {
      const stats = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
        select: {
          Measurements: {
            select: {
              Mediadesign: {
                take: 3,
                orderBy: {
                  createdAt: "desc",
                },
              },
              PhotoProduction: {
                take: 3,
                orderBy: {
                  createdAt: "desc",
                },
              },
              VideoProduction: {
                take: 3,
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
          Tutors: {
            select: {
              status: true,
              tutor: {
                select: {
                  firstName: true,
                  lastName: true,
                  id: true,
                  email: true,
                },
              },
            },
            take: 3,
          },
          PrescribedTo: {
            select: {
              id: true,
              name: true,
              description: true,
              multimedia: true,
              createdAt: true,
              PrescribedBy: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      const allStats = {
        Mediadesign: stats.Measurements[0].Mediadesign,
        PhotoProduction: stats.Measurements[0].PhotoProduction,
        VideoProduction: stats.Measurements[0].VideoProduction,
        Tutors: stats.Tutors.length > 0 && stats.Tutors,
        Prescriptions: stats.PrescribedTo,
      };
      return res.status(200).json(allStats);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: "Что-то пошло не так в homeStatsService " });
    }
  }

  if (user.userRole === "TUTOR") {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);

    try {
      const stats = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
        select: {
          PrescribedBy: {
            where: {
              createdAt: {
                gte: date,
              },
            },
          },
          Students: {
            select: {
              status: true,
              student: {
                select: {
                  firstName: true,
                  lastName: true,
                  id: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      const allStats = {
        Students: stats.Students,
        Prescriptions: stats.PrescribedBy,
      };
      return res.status(200).json(allStats);
    } catch (e) {
      return res.status(400).json({ error: "Something Went Wrong" });
    }
  }
};

export default homeStatsService;
