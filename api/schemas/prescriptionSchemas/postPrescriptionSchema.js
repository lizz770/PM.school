import { z } from "zod";

const postPrescriptionSchema = z.object({
  name:z.string(),
  title: z
    .string()
    .min(1, { message: "Требуеться название заголовка" }),
  description: z
    .string()
    .min(1, { message: "Требуеться описание" }),
  id: z.string().min(1, { message: "Запрашивается  id студента" }),

});

export default postPrescriptionSchema;
