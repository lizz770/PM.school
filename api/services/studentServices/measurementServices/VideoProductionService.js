import prisma from "../../../constants/config.js";

const postVideoProduction = async (req, res, next) => {
    const{userId}=req?.session;
    const{title, description, video}=req.body;
    let mesId; //индификатор изменений от пользователя

  try {
    mesId = await prisma.measurements.findFirst({
      where: {
        userId: userId,
      },
    });
  } catch (e) {
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }

  try {
    await prisma.videoProduction.create({
      data: {
        title:title,
        description:description,
        video:video,
        measurementsId: mesId?.id,
      },
    });

    return res.status(200).json({ message: "Данные раздела videoProduction сохранены" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

const getVideoProduction = async (req, res, next) => {
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
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Неверный ввод данных" });
  }
};

const deleteVideoProduction = async (req, res, next) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Требуеться запрос id" });

  try {
    await prisma.videoProduction.deleteMany({
      where: {
        id: id,
        Measurements: {
          userId: req.session.userId,
        },
      },
    });

    return res.status(200).json({ message: "Данные раздела VideoProduction удалены" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Неверный ввод данных" });
  }
};

export { postVideoProduction, getVideoProduction , deleteVideoProduction};