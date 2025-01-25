import { trpc } from '../../lib/trpc'
import { zSignUpTrpcInput } from "./input"
import { getPasswordHash } from '../../utils/getPasswordHash'
import { signJwt } from '../../utils/signJwt'

export const signUpTrpcRoute = trpc.procedure
.input(
    zSignUpTrpcInput
)
.mutation(async ({ ctx, input }) => {
    const existUser = await ctx.prisma.user.findUnique({
        where: {
            nick: input.nick
        }
    })
    if (existUser) {
        throw new Error('User already exists')
    }
    const user = await ctx.prisma.user.create({
        data: {
            nick: input.nick,
            password: getPasswordHash(input.password)
        }
    })
    const token = signJwt(user.id.toString())
    return { token }
})