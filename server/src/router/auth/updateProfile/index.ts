import { toClientMy } from "../../../lib/models";
import { trpc } from "../../../lib/trpc";
import { zUpdateProfileTrpcInput } from "./input";

export const updateProfileTrpcRoute = trpc.procedure
.input(
    zUpdateProfileTrpcInput
)
.mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
        throw new Error('Unauthorized')
    }
    if (ctx.user.nick !== input.nick) {
        const existUser = await ctx.prisma.user.findUnique({
            where: {
                nick: input.nick
            }
        })
        if (existUser) {
            throw new Error('User already exists')
        }
    }
    const updateUser = await ctx.prisma.user.update({
        where: {
            id: ctx.user.id
        },
        data: input
    })
    ctx.user = updateUser
    return toClientMy(updateUser)
})