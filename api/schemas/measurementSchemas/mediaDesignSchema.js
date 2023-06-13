import { z } from "zod";

const mediadesignSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Требуется заголовок feedback" }),
  description: z
    .string()
    .min(1, { message: "Требуется описание" }),
  image: z
    .string()
    .min(1, { message: "Требуется изображение" }),
});

export default mediadesignSchema;
