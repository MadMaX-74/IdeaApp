import { User } from "@prisma/client"
import _ from "lodash"

export const toClientMy = (user: User | null) => {
    return user && _.pick(user, ['id', 'nick', 'name'])
}