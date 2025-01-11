import { Link, Outlet } from "react-router-dom"
import { getAllIdeasRoute } from "../../lib/routes"

export const Layout = () => {
    return (
        <div>
            <p>Idea App</p>
            <ul>
                <li><Link to={getAllIdeasRoute()}>All Ideas</Link></li>
            </ul>
            <hr />
            <div>
                <Outlet />
            </div>
        </div>
    )
}