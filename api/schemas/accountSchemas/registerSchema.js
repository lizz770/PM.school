import { z } from "zod";
import { UserRole } from "@prisma/client";

const registerSchema = z.object({
  email: z.string().email().min(1, { message: "Электронная почта отсутствует" }),
  firstName: z
    .string()
    .min(1, { message: "Имя отсутствует" })
    .min(2, { message: "Длина имени должна составлять не менее 2 символов" })
    .max(50, {
      message: "Длина имени должна составлять не Более 50 символов",
    }),
  lastName: z
    .string()
    .min(1, { message: "Фамилия Отсутствует" })
    .min(2, { message: "Длина фамилии должна составлять не менее 2 символов" })
    .max(50, {
      message: "Длина фамилии должна составлять не Более 50 символов",
    }),
  password: z
    .string()
    .min(5, {
      message: "Длина пароля должна составлять не менее 5 символов",
    })
    .max(50, {
      message: "Длина пароля должна составлять не Более 50 символов",
    }),
  role: z.nativeEnum([UserRole.TUTOR, UserRole.STUDENT], {
    errorMap: (issue, ctx) => {
      return { message: "Роль отсутствует или недействительна" };
    },
  }),
});

export default registerSchema;
