import { trpc } from "../../lib/trpc";
import { ideas } from "../../lib/ideas";
import { zCreateIdeaTrpcInput } from "./input";

export const createIdeaTrpcRoute = trpc.procedure
  .input(
    zCreateIdeaTrpcInput
  )
  .mutation(({ input }) => {
    const { title, description, text } = input;
    ideas.unshift({
        id: ideas.length + 1,
        title,
        description,
        text
    })
    return { success: true }
  });