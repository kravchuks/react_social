import { NavLink } from 'react-router-dom';
import s from '../Dialogs.module.css';

const DialogItem = (props) => {
    let path = "/messages/" + props.id

    return <div className={s.dialog_box}>
        <img className={s.image} src={props.image}/>
        <NavLink className={navData => navData.isActive ? s.active : s.dialog} to={path}>{props.name}</NavLink>
    </div>
}

export default DialogItem;