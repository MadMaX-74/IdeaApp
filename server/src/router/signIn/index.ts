import { trpc } from "../../lib/trpc"
import { getPasswordHash } from "../../utils/getPasswordHash"
import { signJwt } from "../../utils/signJwt"
import { zSignInTrpcInput } from "./input"

export const signInTrpcRoute = trpc.procedure
.input(
    zSignInTrpcInput
)
.mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
        where: {
            nick: input.nick
        }
    })
    if (!user) {
        throw new Error('User not found')
    }
    const isPasswordValid = getPasswordHash(input.password)
    if (isPasswordValid !== user.password) {
        throw new Error('Invalid password')
    }
    const token = signJwt(user.id.toString())
    return { token }
})