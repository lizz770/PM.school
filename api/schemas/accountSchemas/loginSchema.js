import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Неверный адрес электронной почты" })
    .min(1, { message: "Требуется электронная почта" }),
  password: z
    .string()
    .min(1, {
      message: "Поле для ввода пароля является обязательным",
    })
    .max(255, {
      message: "Пароль слишком длинный",
    }),
});

export default loginSchema;