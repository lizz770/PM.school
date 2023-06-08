import prisma from "../../constants/config.js";

const cancelService = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Не обнаружен пользователь по id" });
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
        .json({ error: `Не удается обновить запрос с помощью ID: ${id}` });

    return res.status(200).json({ message: `Отмененный: ${id}` });
  } catch (e) {
    return res
      .status(400)
      .json({ error: `Невозможно удалить запрос с ID: ${id}` });
  }
};

export default cancelService;
