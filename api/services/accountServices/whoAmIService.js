import prisma from "../../constants/config.js";

const whoAmIService = async (req, res, next) => {
  if (!req?.session?.userId) {
    return res.status(401).json({ authed: "false" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req?.session?.userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        userRole: true,
      },
    });

    if (!user) return res.status(401).json({ authed: "false" });

    return res.status(200).json({
      authed: true,
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Что-то пошло не так в whoAm" });
  }
};

export default whoAmIService;
