import prisma from "../../constants/config.js"
import bcrypt from "bcryptjs";

const loginService = async (req, res) => {
    const { email, password } = req.body;
    try {
      //проверить существует ли почта
      const user = await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (!user) {
        return res.status(400).json({
          authed: false,
          message: "Неверно введена почта",
        });
      }
      //проверить на правильность введенного пароля
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        return res.status(400).json({
          authed: false,
          message: "Неверно введен пароль",
        });
      }
      //если пароль правильный и пользователь существует
      req.session.userId = user.id;
      return res.status(200).json({
        message: req.session.userId,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        authed: false,
        message: "Ошибка,что-то пошло не так",
      });
    }
  };
  
  export default loginService;