import { type UseTRPCQueryResult, type UseTRPCQuerySuccessResult } from '@trpc/react-query/shared'
import { useAppContext, type AppContext } from './ctx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllIdeasRoute } from './routes'
import { ErrorPageComponent } from '../components/ErrorPageComponent'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Loader } from '../components/Loader'

class CheckExistError extends Error {}
const checkExistFn = <T,>(value: T, message: string): NonNullable<T> => {
  if (!value) {
    throw new CheckExistError(message)
  }
  return value
}
class CheckAccessError extends Error {}
const checkAccessFn = <T,>(value: T, message: string): void => {
  if (!value) {
    throw new CheckAccessError(message)
  }
}
class GetAuthorizedMyError extends Error {}

type Props = Record<string, any>
type QueryResult = UseTRPCQueryResult<any, any>
type QuerySuccessResult<TQueryResults extends QueryResult> = UseTRPCQuerySuccessResult<
  NonNullable<TQueryResults['data']>,
  null
>
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext
  queryResult: TQueryResult extends QueryResult ? QuerySuccessResult<TQueryResult> : undefined
}
type SetPropsProps<TQueryResult extends QueryResult | undefined> = HelperProps<TQueryResult> & {
  checkExists: typeof checkExistFn
  checkAccess: typeof checkAccessFn
  getAuthorizedMy: (message?: string) => NonNullable<AppContext['my']>
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
  setProps?: (setPropsProps: SetPropsProps<TQueryResult>) => TProps
  Page: React.FC<TProps>
}

export const PageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>({
  authorizedOnly,
  authorizedOnlyTitle = 'Please, Authorize',
  authorizedOnlyMessage = 'You need to be authorized to access this page',
  redirectAuthorized,
  checkAccess,
  checkAccessTitle = 'Access Denied',
  checkAccessMessage = "You don't have access to this page",
  checkExists,
  checkExistsTitle = 'Not Found',
  checkExistMessage = "The page you're looking for doesn't exist",
  useQuery,
  setProps,
  Page,
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
    return <Loader type="page" />
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
      return <NotFoundPage title={checkExistsTitle} message={checkExistMessage} />
    }
  }
  if (checkAccess) {
    const accessDenied = !checkAccess(helperProps)
    if (accessDenied) {
      return <ErrorPageComponent title={checkAccessTitle} message={checkAccessMessage} />
    }
  }

  const getAuthorizedMy = (message?: string) => {
    if (!ctx.my) {
      throw new GetAuthorizedMyError(message)
    }
    return ctx.my
  }

  try {
    const props = setProps?.({
      ...helperProps,
      checkExists: checkExistFn,
      checkAccess: checkAccessFn,
      getAuthorizedMy: getAuthorizedMy,
    }) as TProps
    return <Page {...props} />
  } catch (e) {
    if (e instanceof CheckExistError) {
      return <ErrorPageComponent title={checkExistsTitle} message={e.message || checkExistMessage} />
    }
    if (e instanceof CheckAccessError) {
      return <ErrorPageComponent title={checkAccessTitle} message={e.message || checkAccessMessage} />
    }
    if (e instanceof GetAuthorizedMyError) {
      return <ErrorPageComponent title={authorizedOnlyTitle} message={e.message || authorizedOnlyMessage} />
    }
    throw e
  }
}

export const withPageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => () => {
    return <PageWrapper {...pageWrapperProps} Page={Page} />
  }
}
