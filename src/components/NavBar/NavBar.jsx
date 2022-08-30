import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';

const NavBar = () => {
    return <nav className={s.nav}>
        <div>
            <NavLink to='/profile' className = { navData => navData.isActive ? s.active : s.item }>Profile</NavLink>
        </div>
        <div>
            <NavLink to='/messages' className = { navData => navData.isActive ? s.active : s.item }>Messages</NavLink>
        </div>
        <div >
            <NavLink to='/users' className = { navData => navData.isActive ? s.active : s.item }>Users</NavLink>
        </div>
    </nav>
}

export default NavBar;