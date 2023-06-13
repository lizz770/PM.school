import prisma from "../../../constants/config.js";

const postMediadesign = async (req, res, next) => {
  const { title, description,image } = req.body;
  const { userId } = req?.session;

  let mesId;
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
    await prisma.mediadesign.create({
      data: {
        title: title,
        description:description,
        image:image,
        measurementsId: mesId?.id,
      },
    });

    res.status(200).json({ message: "Медиадизайн сохранен успешно" });
  } catch (e) {
    res.status(500).json({ error: "Внутрення ошибка сервера" });
  }
};

const getMediadesign = async (req, res, next) => {
  const { skip, take, orderBy, startDate, endDate } = req.query;
  const start = new Date(parseInt(startDate));
  const end = new Date(parseInt(endDate));

  try {
    const mediadesigns = await prisma.mediadesign.findMany({
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
      mediadesigns: mediadesigns ? mediadesigns.slice(0, take) : [],
      hasMore: mediadesigns.length > parseInt(take ?? 1),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Инвалидный ввод данных" });
  }
};

const deleteMediadesign = async (req, res, next) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Требуется запрос id" });

  try {
    await prisma.mediadesign.deleteMany({
      where: {
        id: id,
        Measurements: {
          userId: req.session.userId,
        },
      },
    });

    return res.status(200).json({ message: "Медиадизайн удален успешно" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Инвалидный ввод данных" });
  }
};

export { postMediadesign, getMediadesign, deleteMediadesign };
