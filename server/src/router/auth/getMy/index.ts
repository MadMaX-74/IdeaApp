import _ from "lodash"
import { trpc } from "../../../lib/trpc"
import { toClientMy } from "../../../lib/models"

export const getMyTrpcRoute = trpc.procedure
.query(async ({ ctx }) => {
    return { my: toClientMy(ctx.user) }
})