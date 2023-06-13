import { z } from "zod";


const videoProductionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Требуется заголовок feedback" }),
  description: z
    .string()
    .min(1, { message: "Требуется описание" }),
  video: z
    .string()
    .min(1, { message: "Требуется видео" }),
});

export default videoProductionSchema;
