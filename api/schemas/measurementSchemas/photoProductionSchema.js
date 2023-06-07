import { z } from "zod";

const photoProductionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Отсутствует название заголовка" })
    .max(2000, { message: "Название заголовка слишком длинное" }),
  description: z
    .string()
    .min(1, { message: "Требуется описание" })
    
 
});

export default photoProductionSchema;