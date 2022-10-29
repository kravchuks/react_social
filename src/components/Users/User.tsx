import React from "react";
import { NavLink } from "react-router-dom";
import s from './Users.module.css';
import userLogo from './../../assets/images/userLogo.png'
import { UsersType } from './../../types/types' 


let User = ({user, followingInProgres, unfollow, follow, ...props}) => {
    return (
        <div >
                <span className={s.user_block}>
                    <div>
                        <NavLink to={`/profile/`+ user.id}>
                            <img className={s.photo} src={user.photos.small || userLogo} />
                        </NavLink>
                    </div>
                    <span>
                        <div className={s.user_name}>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <div>
                        {user.followed ?
                         <button className={s.submit} disabled={followingInProgres.some(id=>id===user.id)}
                          onClick={() => ( unfollow(user.id) ) }>Unfollow</button> 
                                        : 
                         <button className={s.submit} disabled={followingInProgres.some(id=>id===user.id)}
                          onClick={() => ( follow(user.id) ) }>Follow</button>}
                    </div>
                </span>
                
        </div>
    )
}

export default User;