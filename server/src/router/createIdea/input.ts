import { z } from "zod";

export const zCreateIdeaTrpcInput = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    text: z.string().min(30, 'Too short, min 30 characters') 
})