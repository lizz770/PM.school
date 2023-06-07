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
    res.status(400).json({ error: "Что-то пошло не так:ошибка" });
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
        },
      });

      const allStats = {
        Mediadesign: stats.Measurements[0].Mediadesign,
        PhotoProduction: stats.Measurements[0].PhotoProduction,
        VideoProduction: stats.Measurements[0].VideoProduction,
      };
      return res.status(200).json(allStats);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: "Что-то пошло не так" });
    }
  }
};

export default homeStatsService;