import prisma from "../../constants/config.js";
import bcrypt from "bcryptjs";

const changePasswordService = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { userId } = req.session;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      req.session.destroy();
      return res.status(401).json({
        authed: false,
        message: "Неверные учетные данные",
      });
    }
    //проверка пароля на коректность
    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!passwordCorrect) {
      req.session.destroy();
      return res.status(401).json({
        authed: false,
        message: "Неверные учетные данные",
      });
    }

    //хэширование пароля
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //обносить акк
    const account = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    //удалить ссесию
    req.session.destroy();

    res.status(401).json({
      message: "Пароль обновлен успешно",
    });
  } catch (error) {
    res.status(400).json({
      message: "Что-то пошло не так в changePassword",
    });
  }
};

export default changePasswordService;
