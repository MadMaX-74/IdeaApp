
export const getRouteParams = <T extends Record<string, boolean>>(params: T) => {
    return Object.keys(params).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}


export const getAllIdeasRoute = () => '/'

export const viewIdeaRouteParams = getRouteParams({ id: true })
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
export const getViewIdeaRoute = ({id}: ViewIdeaRouteParams) => `/idea/${id}`

export const updateIdeaRouteParams = getRouteParams({ ideaId: true })
export type UpdateIdeaRouteParams = typeof updateIdeaRouteParams
export const getUpdateIdeaRoute = ({ ideaId }: UpdateIdeaRouteParams) => `/idea/${ideaId}/edit`

export const getNewIdeaRoute = () => '/idea/new'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getLogOutRoute = () => '/sign-out'
export const getEditProfileRoute = () => '/edit-profile'