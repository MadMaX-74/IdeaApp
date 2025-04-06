import { trpc } from '../../../lib/trpc'
import { zSignUpTrpcInput } from "./input"
import { getPasswordHash } from '../../../utils/getPasswordHash'
import { signJwt } from '../../../utils/signJwt'
import { sendWelcomeEmail } from '../../../lib/emails'

export const signUpTrpcRoute = trpc.procedure
.input(
    zSignUpTrpcInput
)
.mutation(async ({ ctx, input }) => {
    const existUserWithNick = await ctx.prisma.user.findUnique({
        where: {
            nick: input.nick
        }
    })
    if (existUserWithNick) {
        throw new Error('User already exists')
    }
    const existUserWithEmail = await ctx.prisma.user.findUnique({
        where: {
            email: input.email
        }
    })
    if (existUserWithEmail) {
        throw new Error('User already exists')
    }
    const user = await ctx.prisma.user.create({
        data: {
            nick: input.nick,
            email: input.email,
            password: getPasswordHash(input.password)
        }
    })
    sendWelcomeEmail({user})
    const token = signJwt(user.id.toString())
    return { token }
})