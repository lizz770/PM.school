import { z } from "zod";

const videoProductionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Отсутствует название заголовка" }),
  description: z
    .string()
    .min(1, { message: "Требуется описание" })
});

export default videoProductionSchema;