import { z } from "zod";


const photoProductionSchema = z.object({
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

export default photoProductionSchema;


