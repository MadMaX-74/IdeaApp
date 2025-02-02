import { type UseTRPCQueryResult, type UseTRPCQuerySuccessResult } from '@trpc/react-query/shared'
import { useAppContext, type AppContext } from './ctx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllIdeasRoute } from './routes'
import { ErrorPageComponent } from '../components/ErrorPageComponent'

type Props = Record<string, any>
type QueryResult = UseTRPCQueryResult<any, any>
type QuerySuccessResult<TQueryResults extends QueryResult> = UseTRPCQuerySuccessResult<
    NonNullable<TQueryResults['data']>,
    null
>
type HelperProps<TQueryResult extends QueryResult | undefined> = {
    ctx: AppContext
    queryResult: TQueryResult extends QueryResult ? QuerySuccessResult<TQueryResult>: undefined
}
type PageWrapperProps<TProps extends Props, TQueryResult extends QueryResult | undefined = undefined> = {
    redirectAuthorized?: boolean

    authorizedOnly?: boolean
    authorizedOnlyTitle?: string
    authorizedOnlyMessage?: string

    checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean
    checkAccessTitle?: string
    checkAccessMessage?: string

    checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean
    checkExistsTitle?: string
    checkExistMessage?: string

    useQuery?: () => TQueryResult
    setProps?: (helperProps: HelperProps<TQueryResult>) => TProps
    Page: React.FC<TProps>
}

export const PageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>({
    authorizedOnly,
    authorizedOnlyTitle = 'Please, Authorize',
    authorizedOnlyMessage = 'You need to be authorized to access this page',
    redirectAuthorized,
    checkAccess,
    checkAccessTitle = 'Access Denied',
    checkAccessMessage = 'You don\'t have access to this page',
    checkExists,
    checkExistsTitle = 'Not Found',
    checkExistMessage = 'The page you\'re looking for doesn\'t exist',
    useQuery,
    setProps,
    Page
}: PageWrapperProps<TProps, TQueryResult>) => {
    const navigate = useNavigate()
    const ctx = useAppContext()
    const queryResult = useQuery?.()

    const redirectNeeded = redirectAuthorized && ctx.my

    useEffect(() => {
        if (redirectNeeded) {
            navigate(getAllIdeasRoute(), { replace: true })
        }
    }, [redirectNeeded, navigate])

    if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
        return <div>Loading...</div>
    }
    if (queryResult?.isError) {
        return <ErrorPageComponent message={queryResult.error.message} />
    }

    if (authorizedOnly && !ctx.my) {
        return <ErrorPageComponent title={authorizedOnlyTitle} message={authorizedOnlyMessage} />
    }
    const helperProps = { ctx, queryResult: queryResult as never }

    if (checkExists) {
        const notExists = checkExists(helperProps)
        if (notExists) {
            return <ErrorPageComponent title={checkExistsTitle} message={checkExistMessage} />
        }
    }
    if (checkAccess) {
        const accessDenied = !checkAccess(helperProps)
        if (accessDenied) {
        return <ErrorPageComponent title={checkAccessTitle} message={checkAccessMessage} />
        }
    }
    const props = setProps?.(helperProps) as TProps
    return <Page {...props} />
}


export const withPageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>(
    pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
) => {
    return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => () => {
        return <PageWrapper {...pageWrapperProps} Page={Page} />
    }
}