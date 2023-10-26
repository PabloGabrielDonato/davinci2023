import { Link } from "react-router-dom";
import {useProfile, useLogout} from '../../contexts/session.context.jsx'

import './MainNav.css'

function MainNav(){
    const profile = useProfile()
    const onLogout = useLogout()

    return (
    <nav>
        <ul className="main-nav-list">
            <li>
                <Link to="/playlist" className="main-nav-list__link">Playlist</Link>
            </li>
            <li>
                <Link to="/songs" className="main-nav-list__link">Canciones</Link>
            </li>
            <li>
                <Link to="/profile" className="main-nav-list__link">Perfil</Link>
            </li>
            <li>
                <Link onClick={onLogout} className="main-nav-list__link">Salir ({profile.userName})</Link>
            </li>
        </ul>
    </nav>
    )
}

export default MainNav