import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Dialogs.module.css';

type PropsType = {
    id: number,
    image: string,
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/messages/" + props.id

    return <div className={s.dialog_box}>
        <img className={s.image} src={props.image}/>
        <NavLink className={navData => navData.isActive ? s.active : s.dialog} to={path}>{props.name}</NavLink>
    </div>
}

export default DialogItem;