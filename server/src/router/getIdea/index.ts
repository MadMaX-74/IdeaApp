import { z } from 'zod'
import { trpc } from '../../lib/trpc'

export const getIdeaTrpcRoute = trpc.procedure
.input(
    z.object({
        id: z.string()
    })
)
.query(async ({ ctx, input }) => {
    const idea = await ctx.prisma.idea.findUnique({
        where: {
            id: input.id
        }
    })
    return { idea }
})