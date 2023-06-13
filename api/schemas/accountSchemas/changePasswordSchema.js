import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "*Требуется" })
    .min(5, { message: "Пароль должен содержать не менее 5 символов" })
    .max(255, { message: "Пароль слишком длинный" }),
  newPassword: z
    .string()
    .min(1, { message: "*Требуется" })
    .min(5, { message: "Должно быть не менее 5 символов" })
    .max(255, { message: "Слишком длинно" }),
});

export default changePasswordSchema;
