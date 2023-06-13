import prisma from "../../constants/config.js";

const cancelService = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Не предоставлен ID" });
  }
  try {
    const deleted = await prisma.userRelationship.deleteMany({
      where: {
        id: id,
        senderId: req.session.userId,
        status: "PENDING",
      },
    });
    if (!deleted.count)
      return res
        .status(400)
        .json({ error: `Неавторизированный запрос на обновление по ID: ${id}` });

    return res.status(200).json({ message: `Отменен: ${id}` });
  } catch (e) {
    return res
      .status(400)
      .json({ error: `Нельзя обновить запрос по ID: ${id}` });
  }
};

export default cancelService;
