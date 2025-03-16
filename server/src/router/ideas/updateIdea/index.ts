import { trpc } from "../../../lib/trpc"
import { canEditIdeas } from "../../../utils/can"
import { zUpdateIdeaTrpcInput } from "./input"

export const updateIdeaTrpcRoute = trpc.procedure
    .input(zUpdateIdeaTrpcInput)
    .mutation(async ({ ctx, input }) => {
        const {ideaId, ...ideaInput} = input
        if (!ctx.user) {
            throw new Error('User not found')
        }
        const idea = await ctx.prisma.idea.findUnique({
            where: {
                id: ideaId
            }
        })
        if (!idea) {
            throw new Error('Idea not found')
        }
        if (!canEditIdeas(ctx.user, idea)) {
            throw new Error('You are not the author of this idea')
        }
        await ctx.prisma.idea.update({
            where: {
                id: ideaId
            },
            data: ideaInput
        })
        return { idea }
})