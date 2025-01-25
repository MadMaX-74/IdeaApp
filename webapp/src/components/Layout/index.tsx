import { Link, Outlet } from "react-router-dom"
import { getAllIdeasRoute, getLogOutRoute, getNewIdeaRoute, getSignUpRoute } from "../../lib/routes"
import style from './index.module.scss'
import { trpc } from "../../lib/trpc"

export const Layout = () => {
    const { data, isLoading, isError, isFetching } = trpc.getMy.useQuery()
    return (
        <div className={style.layout}>
            <div className={style.navigations}>
                <p className={style.logo}>Idea App</p>
                <ul className={style.menu}>
                    <li className={style.menuItem}>
                        <Link className={style.link} to={getAllIdeasRoute()}>All Ideas</Link>
                    </li>
                    { isLoading || isFetching || isError ? null : data.my? (
                    <>
                        <li className={style.menuItem}>
                            <Link className={style.link} to={getNewIdeaRoute()}>New Idea</Link>
                        </li>
                        <li className={style.menuItem}>
                        <Link className={style.link} to={getLogOutRoute()}>Log Out ({data.my.nick})</Link>
                        </li>
                    </>
                    ) : (
                    <>
                        <li className={style.menuItem}>
                            <Link className={style.link} to={getSignUpRoute()}>Sign Up</Link>
                        </li>
                        <li className={style.menuItem}>
                            <Link className={style.link} to={getSignUpRoute()}>Sign In</Link>
                        </li>
                    </>
                )}
                </ul>
            </div>
            <div className={style.content}>
                <Outlet />
            </div>
        </div>
    )
}