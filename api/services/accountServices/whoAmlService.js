import prisma from "../../constants/config.js";

const whoAmIService = async (req, res) => {
  if (!req?.session?.userId) {
    return res.status(401).json({ authed: "false" });
  }
    try {
        //находим пользователя в базе данных и возвращаем поля
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
  
      //если пользователь не найден
      if (!user) return res.status(401).json({ authed: false });
  
      return res.status(200).json({
        authed: true,
        user,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка в функции whoAmiService" });
    }
  };
  
  export default whoAmIService;

