import jwt from 'jsonwebtoken'
import { env } from '../lib/env'

export const signJwt = (payload: string) => {
    return jwt.sign(payload, env.JWT_SECRET)
}