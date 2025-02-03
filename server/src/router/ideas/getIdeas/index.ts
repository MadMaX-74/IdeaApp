import _ from 'lodash'
import { trpc } from '../../lib/trpc'

export const getIdeasTrpcRoute = trpc.procedure
    .query(async ({ctx}) => {
        const ideas = await ctx.prisma.idea.findMany({
            select: {
                id: true,
                title: true,
                description: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return { ideas }
    })