import { create } from "lodash";
import { trpc } from "../../../lib/trpc";
import { zSetIdeaLikeTrpcInput } from "./input";

export const setIdeaLikeTrpcRoute = trpc.procedure
.input(
    zSetIdeaLikeTrpcInput
)
.mutation(async ({ ctx, input }) => {
    const {ideaId, isLikeByMe} = input
    if (!ctx.user) {
        throw new Error('Unauthorized')
    }
    const idea = await ctx.prisma.idea.findUnique({
        where: {
            id: ideaId
        }
    })
    if (!idea) {
        throw new Error('Idea not found')
    }
    if(isLikeByMe) {
        await ctx.prisma.ideaLike.upsert({
            where: {
                ideaId_userId: {
                    ideaId,
                    userId: ctx.user.id
                }
            },
            create: {
                ideaId,
                userId: ctx.user.id
            },
            update: {}
        })
    } else {
        await ctx.prisma.ideaLike.delete({
            where: {
                ideaId_userId: {
                    ideaId,
                    userId: ctx.user.id
                }
            }
        })
    }
    const likesCount = await ctx.prisma.ideaLike.count({
        where: {
            ideaId
        }
    })
    return {
        idea: {
            id: ideaId,
            likesCount,
            isLikeByMe
        }
    }
})