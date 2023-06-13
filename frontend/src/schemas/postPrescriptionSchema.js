import { z } from "zod";

const postPrescriptionSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Prescription Title is required" })
    .max(300, { message: "Prescription Title is too long" }),
  description: z
    .string()
    .min(1, { message: "description is required" }),
  multimedia: z
    .string()
    .min(1, { message: "multimedia is required" })
    
});

export default postPrescriptionSchema;
