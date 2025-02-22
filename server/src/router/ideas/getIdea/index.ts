import { z } from 'zod'
import { trpc } from '../../../lib/trpc'
import _omit from 'lodash/omit';

export const getIdeaTrpcRoute = trpc.procedure
.input(
    z.object({
        id: z.string()
    })
)
.query(async ({ ctx, input }) => {
    const rawIdea = await ctx.prisma.idea.findUnique({
        where: {
            id: input.id
        },
        include: {
            author: {
                select: {
                    id: true,
                    nick: true,
                    name: true
                }
            },
            ideasLikes: {
                select: {
                    id: true
                },
                where: {
                    userId: ctx.user?.id
                }
            },
            _count: {
                select: {
                    ideasLikes: true
                }
            }
        }
    })
    const isLikedByMe: boolean = !!rawIdea?.ideasLikes.length
    const likesCount: number = rawIdea?._count.ideasLikes || 0
    const idea = rawIdea && {..._omit(rawIdea, ['ideasLikes', '_count']), isLikedByMe, likesCount }

    return { idea }
})