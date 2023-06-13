import prisma from "../../constants/config.js";
import bcrypt from "bcryptjs";

const registerService = async (req, res, next) => {
  try {
    //проверка почты на существование
    const { email, firstName, lastName, password, role } = req.body;
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailExists) {
      return res.status(400).json({ message: "Такая почта уже существует" });
    }
    //хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    //создание аакаунта
    const account = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        password: hashedPassword,
        userRole: role,
      },
    });

    const mes = await prisma.measurements.create({
      data: {
        user: {
          connect: {
            id: account.id,
          },
        },
      },
    });
    req.session.userId = account.id;
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e?.message });
  }
  res.status(200).json({ message: "Аккаунт создан успешно" });
};

export default registerService;
