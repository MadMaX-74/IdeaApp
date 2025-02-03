import { trpc } from "../../lib/trpc";
import { zCreateIdeaTrpcInput } from "./input";

export const createIdeaTrpcRoute = trpc.procedure
  .input(
    zCreateIdeaTrpcInput
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new Error('User not found')
    }
    await ctx.prisma.idea.create({
      data: {...input, authorId: ctx.user.id}
    })
    return { success: true }
  });