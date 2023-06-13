import { z } from "zod";


const postPrescriptionSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Требуется заголовок feedback" }),
  description: z
    .string()
    .min(1, { message: "Требуется описание" }),
  multimedia: z
    .string()
    .min(1, { message: "Требуется изображени/видео" }),
  id: z.string().min(1, { message: "Требуется id студента" }),
});

export default postPrescriptionSchema;
