import _ from "lodash"
import { trpc } from "../../lib/trpc"

export const getMyTrpcRoute = trpc.procedure
.query(async ({ ctx }) => {
    return { my: ctx.user && _.pick(ctx.user, ['id', 'nick']) }
})