import prisma from "../../constants/config.js";

const studentOverviewService = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "student id is required" });
  }

  try {
    const student = await prisma.user.findMany({
      where: {
        id: id,
        Tutors: {
          some: {
            tutorId: req.session.userId,
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
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

    if (student.length > 0) {
      const studentInfo = {
        id: student[0].id,
        firstName: student[0].firstName,
        lastName: student[0].lastName,
        photoProduction: student[0]?.Measurements[0]?.PhotoProduction,
        mediadesign: student[0]?.Measurements[0]?.Mediadesign,
        videoProduction: student[0]?.Measurements[0]?.VideoProduction,
      };
      return res.status(200).json({ ...studentInfo });
    } else return res.status(400).json({ message: "student not found" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export default studentOverviewService;
