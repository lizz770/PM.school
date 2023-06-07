import * as z from "zod";

const registerSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(1, { message: "Отсутствует электронная почта" })
      .max(255, { message: "Электронная почта слишком длинная" }),
    firstName: z
      .string()
      .min(1, { message: "Отсутствует имя" })
      .max(255, { message: "Имя слишком длинное" }),
    lastName: z
      .string()
      .min(1, { message: "Отсутствует фамилия" })
      .max(255, { message: "Фамилия слишком длинная" }),
    password: z
      .string()
      .min(1, { message: "Отсутствует пароль" })
      .min(5, { message: "Пароль должен быть больше 5 символов" })
      .max(255, { message: "Пароль слишком длинный" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Отсутствует подтверждение пароля" })
      .min(5, { message: "Подтверждение пароля должно быть больше 5 символов" })
      .max(255, { message: "Подтвержденный пароль слишком длинный" }),
    role: z
      .string()
      .min(1, { message: "Отсутствует роль" })
      .max(255, { message: "Роль слишком длинная" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export default registerSchema;