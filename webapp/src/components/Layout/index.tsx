import { Link, Outlet } from "react-router-dom"
import { getAllIdeasRoute, getNewIdeaRoute } from "../../lib/routes"
import style from './index.module.scss'

export const Layout = () => {
    return (
        <div className={style.layout}>
            <div className={style.navigations}>
                <p className={style.logo}>Idea App</p>
                <ul className={style.menu}>
                    <li className={style.menuItem}>
                        <Link className={style.link} to={getAllIdeasRoute()}>All Ideas</Link>
                    </li>
                    <li className={style.menuItem}>
                        <Link className={style.link} to={getNewIdeaRoute()}>New Idea</Link>
                    </li>
                </ul>
            </div>
            <div className={style.content}>
                <Outlet />
            </div>
        </div>
    )
}