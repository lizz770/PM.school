import prisma from "../../../constants/config.js";

const postVideoProduction = async (req, res) => {
  const { title, description,video } = req.body;
  const { userId } = req?.session;

  let mesId; // measurement id для пользователя 

  try {
    mesId = await prisma.measurements.findFirst({
      where: {
        userId: userId,
      },
    });
  } catch (e) {
    res.status(500).json({ error: "Внутрення ошибка сервера" });
  }

  try {
    await prisma.videoProduction.create({
      data: {
        title: title,
        description:description,
        video:video,
        measurementsId: mesId?.id,
      },
    });

    res.status(200).json({ message: "videoProduction saved" });
  } catch (e) {
    res.status(500).json({ error: "Внутрення ошибка сервера" });
  }
};

const getVideoProduction = async (req, res) => {
  const { skip, take, orderBy, startDate, endDate } = req.query;
  const start = new Date(parseInt(startDate));
  const end = new Date(parseInt(endDate));

  try {
    const videoProductions = await prisma.videoProduction.findMany({
      skip: parseInt(skip ?? 0),
      take: parseInt(take ? take + 1 : 2),
      orderBy: {
        createdAt: orderBy ?? "desc",
      },
      where: {
        Measurements: {
          userId: req.session.userId,
        },
        createdAt: startDate || endDate ? { gte: start, lte: end } : undefined,
      },
    });
    return res.status(200).json({
      videoProductions: videoProductions ? videoProductions.slice(0, take) : [],
      hasMore: videoProductions.length > parseInt(take ?? 1),
    });
  } catch {
    return res.status(500).json({ error: "Invalid Input" });
  }
};

const deleteVideoProduction = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "id query is required" });

  try {
    const hr = await prisma.videoProduction.deleteMany({
      where: {
        id: id,
        Measurements: {
          userId: req?.session?.userId,
        },
      },
    });
    if (hr.count === 0)
      return res.status(400).json({ error: "videoProduction not found" });
    return res.status(200).json({ message: "videoProduction deleted" });
  } catch (e) {
    return res.status(500).json({ error: "Внутрення ошибка сервера" });
  }
};

export { postVideoProduction, getVideoProduction, deleteVideoProduction };
