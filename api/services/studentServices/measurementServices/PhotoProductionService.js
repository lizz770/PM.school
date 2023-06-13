import prisma from "../../../constants/config.js";

const postPhotoProduction = async (req, res, next) => {
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
    const newTp = await prisma.photoProduction.create({
      data: {
        title: title,
        description:description,
        image:image,
        measurementsId: mesId?.id,
      },
    });

    res.status(200).json({ message: "photoProduction saved", tp: newTp });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Внутрення ошибка сервера" });
  }
};

const getPhotoProduction = async (req, res, next) => {
  const { skip, take, orderBy, startDate, endDate } = req.query;
  const start = new Date(parseInt(startDate));
  const end = new Date(parseInt(endDate));

  try {
    const photoProductions = await prisma.photoProduction.findMany({
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
      photoProductions: photoProductions ? photoProductions.slice(0, take) : [],
      hasMore: photoProductions.length > parseInt(take ?? 1),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Инвалидный ввод данных" });
  }
};

const deletePhotoProduction = async (req, res, next) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Требуется запрос id" });

  try {
    await prisma.photoProduction.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "photoProduction deleted" });
  } catch (e) {
    return res.status(500).json({ error: "Внутрення ошибка сервера" });
  }
};

export { postPhotoProduction, getPhotoProduction, deletePhotoProduction };
