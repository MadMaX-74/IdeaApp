import { trpc } from "../../../lib/trpc"
import { getPasswordHash } from "../../../utils/getPasswordHash"
import { zUpdatePasswordTrpcInput } from "./input"

export const updatePasswordTrpcRoute = trpc.procedure
.input(
    zUpdatePasswordTrpcInput
)
.mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
        throw new Error('Unauthorized')
    }
    const user = await ctx.prisma.user.update({
        where: {
            id: ctx.user.id
        },
        data: {
            password: getPasswordHash(input.newPassword)
        }
    })
    ctx.user = user
    return { success: true }
})