import s from '../Dialogs.module.css';
import React from 'react';

type PropsType = {
    text: string
}

const Message: React.FC<PropsType> = (props) => {

    return <div className={s.message}>{props.text}</div>
}

export default Message;