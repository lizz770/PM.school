import prisma from "../../constants/config.js";

const mediadesign = async (req, res, next) => {
  const { id, skip, take, orderBy, startDate, endDate } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Запрашиваеться id студента" });
  }

  try {
    let start;
    let end;
    if (!startDate || !endDate) {
      start = new Date();
      end = new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else {
      start = new Date(parseInt(startDate)); //милисекунды
      end = new Date(parseInt(endDate)); //милисекунды
    }

    const student = await prisma.user.findMany({
      where: {
        id: id,
        Tutors: {
          some: {
            tutorId: req.session.userId,
            status: "ACCEPTED",
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        Measurements: {
          select: {
            mediadesign: {
              skip: parseInt(skip ?? 0),
              take: parseInt(take ? take + 1 : 2),
              orderBy: {
                createdAt: orderBy ?? "desc",
              },
              where: {
                createdAt: {
                  gte: start,
                  lte: end,
                },
              },
            },
          },
        },
      },
    });

    if (student.length > 0) {
      const studentInfo = {
        id: student[0].id,
        firstName: student[0].firstName,
        lastName: student[0].lastName,
        mediadesign: student[0]?.Measurements[0]?.Mediadesign,
      };
      return res.status(200).json({
        ...studentInfo,
        hasMore: studentInfo.mediadesign.length > parseInt(take ?? 1),
      });
    } else {
      return res.status(404).json({ message: "Студент не найден" });
    }
  } catch (e) {
    res.status(500).json({ error: "Инвалидный запрос" });
  }
};

const photoProduction = async (req, res, next) => {
  const { id, skip, take, orderBy, startDate, endDate } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Запрашиваеться id студента" });
  }

  try {
    let start;
    let end;
    if (!startDate || !endDate) {
      start = new Date();
      end = new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else {
      start = new Date(parseInt(startDate)); //милисекунды
      end = new Date(parseInt(endDate)); //милисекунды
    }

    const student = await prisma.user.findMany({
      where: {
        id: id,
        Tutors: {
          some: {
            tutorId: req.session.userId,
            status: "ACCEPTED",
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        Measurements: {
          select: {
            PhotoProduction: {
              skip: parseInt(skip ?? 0),
              take: parseInt(take ? take + 1 : 2),
              orderBy: {
                createdAt: orderBy ?? "desc",
              },
              where: {
                createdAt: {
                  gte: start,
                  lte: end,
                },
              },
            },
          },
        },
      },
    });

    if (student.length > 0) {
      const studentInfo = {
        id: student[0].id,
        firstName: student[0].firstName,
        lastName: student[0].lastName,
        photoProduction: student[0]?.Measurements[0]?.PhotoProduction,
      };
      return res.status(200).json({
        ...studentInfo,
        hasMore: studentInfo.photoProduction.length > parseInt(take ?? 1),
      });
    } else {
      return res.status(404).json({ message: "Студент не найден" });
    }
  } catch (e) {
    res.status(500).json({ error: "Инвалидный запрос" });
  }
};

const videoProduction = async (req, res, next) => {
  const { id, skip, take, orderBy, startDate, endDate } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Запрашиваеться id студента" });
  }

  try {
    let start;
    let end;
    if (!startDate || !endDate) {
      start = new Date();
      end = new Date();
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else {
      start = new Date(parseInt(startDate)); //милисекунды
      end = new Date(parseInt(endDate)); //милисекунды
    }

    const student = await prisma.user.findMany({
      where: {
        id: id,
        Tutors: {
          some: {
            tutorId: req.session.userId,
            status: "ACCEPTED",
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        Measurements: {
          select: {
            VideoProduction: {
              skip: parseInt(skip ?? 0),
              take: parseInt(take ? take + 1 : 2),
              orderBy: {
                createdAt: orderBy ?? "desc",
              },
              where: {
                createdAt: {
                  gte: start,
                  lte: end,
                },
              },
            },
          },
        },
      },
    });

    if (student.length > 0) {
      const studentInfo = {
        id: student[0].id,
        firstName: student[0].firstName,
        lastName: student[0].lastName,
        videoProduction: student[0]?.Measurements[0]?.VideoProduction,
      };
      return res.status(200).json({
        ...studentInfo,
        hasMore: studentInfo.videoProduction.length > parseInt(take ?? 1),
      });
    } else {
      return res.status(404).json({ message: "Студент не найден" });
    }
  } catch (e) {
    res.status(500).json({ error: "Инвалидный запрос" });
  }
};

export { mediadesign, photoProduction, videoProduction };
