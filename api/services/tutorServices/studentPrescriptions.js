import prisma from "../../constants/config.js";

const getStudentPrescriptions = async (req, res, next) => {
  const { id, status, by } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Student id is required" });
  }

  try {
    const student = await prisma.user.findMany({
      where: {
        id: id === "ALL" ? undefined : id,
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
        PrescribedTo: {
          where: {
            status: status === "ALL" ? undefined : status,
            PrescribedBy: {
              id:
                by === "ALL"
                  ? undefined
                  : by === "ME"
                  ? req.session.userId
                  : by,
            },
          },
          select: {
            id: true,
            name: true,
            description: true,
            multimedia: true,
            createdAt: true,
            status: true,
            PrescribedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            PrescribedTo: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (student?.length > 0 && student?.length < 2) {
      return res.status(200).json({ ...student[0] });
    }
    if (student?.length > 1) {
      return res.status(200).json({ student });
    }
    return res.status(404).json({ message: "student not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Внутрення ошибка сервера studentprescription" });
  }
};

const postStudentPrescription = async (req, res, next) => {
  const { id, name, description, multimedia } = req.body;

  try {
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
        Tutors: {
          where: {
            tutorId: req.session.userId,
            studentId: id,
          },
        },
      },
    });

    if (!student.length) {
      return res.status(404).json({ message: "student not found" });
    }

    const prescriptionCreated = await prisma.prescriptionFeedback.create({
      data: {
        description: description,
        multimedia: multimedia,
        name: name,
        prescribedById: req.session.userId,
        prescribedToId: id,
        userRelationshipId: student[0]?.Tutors[0]?.id,
      },
    });

    return res.status(200).json(prescriptionCreated);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "внутренняя ошибка сервера" });
  }
};

const deleteStudentPrescription = async (req, res, next) => {
  const { studentId, prescriptionId } = req.query;
  if (!studentId || !prescriptionId) {
    return res
      .status(400)
      .json({ message: "student id and prescription id are required" });
  }

  try {
    const student = await prisma.user.findMany({
      where: {
        id: studentId,
        Tutors: {
          some: {
            tutorId: req.session.userId,
            status: "ACCEPTED",
          },
        },
      },
      select: {
        id: true,
        Tutors: {
          where: {
            tutorId: req.session.userId,
            studentId: studentId,
          },
        },
      },
    });

    if (!student.length) {
      return res.status(404).json({ message: "student not found" });
    }

    const deletedPrescription = await prisma.prescriptionFeedback.deleteMany({
      where: {
        id: prescriptionId,
        prescribedToId: studentId,
        prescribedById: req.session.userId,
      },
    });

    if (!deletedPrescription.count) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    return res.status(200).json({
      message: `Prescription with id ${prescriptionId} is now deleted`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "внутренняя ошибка сервера" });
  }
};

export {
  getStudentPrescriptions,
  deleteStudentPrescription,
  postStudentPrescription,
};
