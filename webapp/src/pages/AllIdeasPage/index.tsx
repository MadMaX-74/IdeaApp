import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { Segment } from '../../components/Segment'
import { Alert } from '../../components/Alert'
import { useDebounceValue } from 'usehooks-ts'
import  InfiniteScroll  from 'react-infinite-scroller'
import { layoutContentElementRef } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { useForm } from '../../lib/form'
import { zGetIdeasTrpcInput } from '@ideaapp/server/src/router/ideas/getIdeas/input'
import { Input } from '../../components/Input'

export const AllIdeasPage = () => {
  const {formik} = useForm({
    initialValues: {
      search: ''
    },
    validationSchema: zGetIdeasTrpcInput.pick({search: true})
  })
  const search = useDebounceValue(formik.values.search, 500)
  const { data, error, isLoading, isFetching, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } = trpc.getIdeas.useInfiniteQuery({
    search: search[0],
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  return (
    <Segment title="Ideas App">
      <div className={styles.filter}>
        <Input maxWidth={'100%'} name="Search" label="Search" formik={formik} />
      </div>
      {isLoading || isFetching || isRefetching ? (<Loader type="section" />) :
      isError ? (<Alert color="red">{error.message}</Alert>) :
      !data ? (<Alert color="yellow">No ideas found</Alert>) : (
      <InfiniteScroll
        threshold={250}
        loadMore={() => {
          if (!isFetchingNextPage && hasNextPage) {
            void fetchNextPage()
          }
        }}
        hasMore={hasNextPage}
        loader={<div className={styles.more} key="loader"><Loader type="section" /></div>}
        getScrollParent={() => layoutContentElementRef.current}
        useWindow={(layoutContentElementRef.current && getComputedStyle(layoutContentElementRef.current).overflow) !== 'auto'}
      >
        <div className={styles.ideas}>
        {data!.pages
        .flatMap((page) => page.ideas)
        .map((idea) => (
          <div className={styles.idea} key={idea.id}>
            <Segment title={
                <Link className={styles.ideaLink} to={`/idea/${idea.id}`}>
                {idea.title}
              </Link>
            } size={2} description={idea.description}>
              Likes: {idea.likesCount}
            </Segment>
          </div>
        ))}
        </div>
      </InfiniteScroll>)}
    </Segment>
  )
}
