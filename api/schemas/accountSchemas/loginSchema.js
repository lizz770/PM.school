import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, {
      message: "Поле для ввода пароля является обязательным",
    })
    .max(255, {
      message: "Поле пароля слишком длинное",
    }),
});

export default loginSchema;
