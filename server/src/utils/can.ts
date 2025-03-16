import type { User, Idea, UserPermission } from "@prisma/client";

type MaybeUser = Pick<User, "id" | "permissions"> | null;
type MaybeIdea = Pick<Idea, "id" | "authorId"> | null;

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
    return user?.permissions.includes(permission) || user?.permissions.includes("ALL") || false;
}

export const canBlockIdeas = (user: MaybeUser) => {
    return hasPermission(user, "BLOCK_IDEAS");
}
export const canEditIdeas = (user: MaybeUser, idea: MaybeIdea) => {
    return !!user && !!idea && user?.id === idea?.authorId;
}