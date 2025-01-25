import { z } from "zod";

export const zSignInTrpcInput = z.object({
    nick: z.string().min(1).regex (/^[a-z0-9-]+$/),
    password: z.string().min(1)
})