import { Link, Outlet } from "react-router-dom"
import { getAllIdeasRoute, getLogOutRoute, getNewIdeaRoute, getSignUpRoute } from "../../lib/routes"
import style from './index.module.scss'
import { useMy } from "../../lib/ctx"

export const Layout = () => {
    const my = useMy()
    return (
        <div className={style.layout}>
            <div className={style.navigations}>
                <p className={style.logo}>Idea App</p>
                <ul className={style.menu}>
                    <li className={style.menuItem}>
                        <Link className={style.link} to={getAllIdeasRoute()}>All Ideas</Link>
                    </li>
                    {my? (
                    <>
                        <li className={style.menuItem}>
                            <Link className={style.link} to={getNewIdeaRoute()}>New Idea</Link>
                        </li>
                        <li className={style.menuItem}>
                        <Link className={style.link} to={getLogOutRoute()}>Log Out ({my.nick})</Link>
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