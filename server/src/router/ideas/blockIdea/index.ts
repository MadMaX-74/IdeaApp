import { trpc } from "../../../lib/trpc";
import { canBlockIdeas } from "../../../utils/can";
import { zBlockIdeaTrpcInput } from "./input";

export const blockIdeaTrpcRoute = trpc.procedure.input(zBlockIdeaTrpcInput).mutation(async ({ ctx, input }) => {
    const { ideaId } = input;
    if (!canBlockIdeas(ctx.user)) {
        throw new Error("You are not allowed to block ideas. Permisson denied");
    }
    const idea = await ctx.prisma.idea.findUnique({ where: { id: ideaId } });
    if (!idea) {
        throw new Error("Idea not found");
    }
    await ctx.prisma.idea.update({
        where: { id: ideaId },
        data: { blockedAt: new Date() }
    });
    return { success: true };
});