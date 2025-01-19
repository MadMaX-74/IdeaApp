import { trpc } from "../../lib/trpc";
import { zCreateIdeaTrpcInput } from "./input";

export const createIdeaTrpcRoute = trpc.procedure
  .input(
    zCreateIdeaTrpcInput
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.idea.create({
      data: input
    })
    return { success: true }
  });