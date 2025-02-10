import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'
import { Segment } from '../../components/Segment'
import { Alert } from '../../components/Alert'
import  InfiniteScroll  from 'react-infinite-scroller'
import { layoutContentElementRef } from '../../components/Layout'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } = trpc.getIdeas.useInfiniteQuery({
    limit: 5
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  return (
    <Segment title="Ideas App">
      {isLoading || isRefetching ? (<div>Loading...</div>) : isError ? (<Alert color="red">{error.message}</Alert>) : (
      <InfiniteScroll
        threshold={250}
        loadMore={() => {
          if (!isFetchingNextPage && hasNextPage) {
            void fetchNextPage()
          }
        }}
        hasMore={hasNextPage}
        loader={<div className={styles.more} key="loader">Loading...</div>}
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
            </Segment>
          </div>
        ))}
        </div>
      </InfiniteScroll>)}
    </Segment>
  )
}
