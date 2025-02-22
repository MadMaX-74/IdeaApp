import type { TrpcRouterOutput } from "@ideaapp/server/src/router"
import { trpc } from "../../lib/trpc";
import style from './style.module.scss'

export const LikeButton = ({idea} :{idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>}) => {
    const trpcUtils = trpc.useContext()
    const setIdeaLike = trpc.setIdeaLike.useMutation({
        onMutate: ({isLikeByMe}) => {
            const oldGetIdeaData = trpcUtils.getIdea.getData({ id: idea.id })
           if (oldGetIdeaData?.idea) {
            const newGetIdeaData = {
                ...oldGetIdeaData,
                idea: {
                    ...oldGetIdeaData.idea,
                    isLikeByMe,
                    likesCount: oldGetIdeaData.idea.likesCount + (isLikeByMe ? 1 : -1)
                }
            }
            trpcUtils.getIdea.setData({ id: idea.id }, newGetIdeaData)
            }
        },
        onSuccess: () => {
            trpcUtils.getIdea.invalidate({ id: idea.id })
        }
    })
    return (
        <button className={style.likeButton}
        onClick={() => setIdeaLike.mutateAsync({ ideaId: idea.id, isLikeByMe: !idea.isLikeByMe })}>
            {idea.isLikeByMe ? 'Like' : 'Unlike'}
        </button>
    )
}