import { z } from "zod";
import { UserRole } from "@prisma/client";

const registerSchema = z.object({
  email: z.string().email().min(1, { message: "Электронная почта отсутствует" }),
  firstName: z
    .string()
    .min(1, { message: "Имя отсутствует" })
    .min(2, { message: "Длина Имени должна составлять не менее 2 Символов" })
    .max(50, {
      message: "Длина Имени составляет не более 50 символов",
    }),
  lastName: z
    .string()
    .min(1, { message: "Фамилия отсутствует" })
    .min(2, { message: "Длина фамилии не менее 2 символов" })
    .max(50, {
      message: "Фамилия не больше 50 символов",
    }),
  password: z
    .string()
    .min(5, {
      message: "Пароль не может быть короче 5 символов",
    })
    .max(50, {
      message: "Пароль не может быть больше 50 символов",
    }),
  role: z.nativeEnum([UserRole.TUTOR, UserRole.STUDENT], {
    errorMap: (issue, ctx) => {
      return { message: "Такой роли не существуе или она инвалидна" };
    },
  }),
});

export default registerSchema;