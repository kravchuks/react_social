import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from './../../logo.svg'

const Header = (props) => {
    return <header className={style.header}>
        <div className={style.container}>
            <NavLink to={'/profile'} className={style.logo}>
                <img className={style.img} src={logo}></img>
                <h1>React <span>Social</span></h1>
            </NavLink>
            
            <div className={style.loginBlock}>
                {props.isAuth ? <div className={style.userName}>{props.login}<a className={style.login__link} onClick={props.logout}>Sing Up</a></div> 
                              : <NavLink className={style.login__link} to='/login'>Sing In</NavLink>}
            </div>
        </div>
    </header>
}

export default Header;