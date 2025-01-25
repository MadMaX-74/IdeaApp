import { z } from "zod";

export const zSignUpTrpcInput = z.object({
    nick: z.string().min(1).regex (/^[a-z0-9-]+$/),
    password: z.string().min(1)
})