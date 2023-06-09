import prisma from "../../constants/config.js";

const getTutorPrescriptions = async (req, res, next) => {
  const { by, status } = req.query;

  try {
    const prescriptions = await prisma.user.findUnique({
      where: {
        id: req?.session?.userId,
      },
      select: {
        PrescribedTo: {
          where: {
            status: {
              in: status ? status.split(",") : undefined,
            },
            prescribedById: by === "ALL" ? undefined : by ? by : undefined,
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
            name: true,
            title: true,
            description: true,
            multimedia:true,
            PrescribedBy: {
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

    return res.status(200).json({ prescriptions: prescriptions.PrescribedTo });
  } catch (e) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const deleteTutorPrescription = async (req, res, next) => {
  const { tutorId, prescriptionId } = req.query;

  try {
    if (!tutorId || !prescriptionId)
      return res
        .status(400)
        .json({ message: "tutorId и FeedBackId запрашивается" });

    const prescription = await prisma.prescriptionFeedback.deleteMany({
      where: {
        id: prescriptionId,
        prescribedById: tutorId,
        prescribedToId: req?.session?.userId,
      },
    });

    if (prescription.count === 0)
      return res.status(400).json({ message: "Фидбэк не найден" });

    return res
      .status(200)
      .json({ message: `Риск с id ${prescriptionId} теперь удален` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const patchTutorPrescription = async (req, res, next) => {
  const { tutorId, prescriptionId, status } = req.body;

  try {
    if (!tutorId || !prescriptionId)
      return res
        .status(400)
        .json({ message: "tutorId, PrescriptionId and Status запрашиваются" });

    const prescription = await prisma.prescriptionFeedback.updateMany({
      where: {
        id: prescriptionId,
        prescribedById: tutorId,
        prescribedToId: req?.session?.userId,
        status: "PENDING",
      },
      data: {
        status: "ACCEPTED",
      },
    });

    if (prescription.count === 0)
      return res.status(400).json({ message: "Фидбэк не найден" });

    return res.status(200).json({
      message: `Фидбэк id от ${prescriptionId} теперь принят `,
    });
  } catch (e) {
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export {
  getTutorPrescriptions,
  deleteTutorPrescription,
  patchTutorPrescription,
};
