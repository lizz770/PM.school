import prisma from "../../constants/config.js";
import bcrypt from "bcryptjs";

const loginService = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //проверка на существование еще одной почты
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!user) {
      return res.status(400).json({
        authed: false,
        message: "Неверные учетные данные",
      });
    }
    //Проверка пароля на корректность
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).json({
        authed: false,
        message: "Неверные учетные данные",
      });
    }

    req.session.userId = user.id;
    res.status(200).json({
      message: req.session.userId,
    });
  } catch (error) {
    res.status(400).json({
      authed: false,
      message: "Что-то пошло не так",
    });
  }
};

export default loginService;
