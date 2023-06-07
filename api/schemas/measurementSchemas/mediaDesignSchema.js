import { z } from "zod";

const mediaDesignSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Отсутствует название заголовка" }),
  description: z
    .string()
    .min(1, { message: "Требуется описание" }),
  image: z
    .string()
});

export default mediaDesignSchema;

