import { z } from "zod";

export const zSignUpTrpcInput = z.object({
    nick: z.string().min(1).regex (/^[a-z0-9-]+$/),
    email: z.string().email(),
    password: z.string().min(1)
})