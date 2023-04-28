import { Link,useMatch,useResolvedPath } from "react-router-dom"
import LogoutButton from "./components/LogoutButton";

export default function Navbar() {

    
    return <nav className="nav">
        <Link to="/" className="site-title">ESW Team-31</Link>
        <ul>
            <CustomLink to="/login">Dashboard</CustomLink>
            <CustomLink to="/about">About</CustomLink>
        </ul>
        <LogoutButton />

    </nav>
}

function CustomLink({ to,children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive?"active":"" } >
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}