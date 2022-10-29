import React from "react";
import { UsersType } from "../../types/types";
import Paginator from "../../utils/Paginator/Paginator.tsx";
import User from "./User.tsx";
import s from "./Users.module.css"

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPAgeChanged: (pageNumber: number) => void,
    users: Array<UsersType>,
    followingInProgres: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}

let Users: React.FC<PropsType> = (props) => {

    return <div className={s.user}>
        <Paginator totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPAgeChanged={props.onPAgeChanged}
            portionSize={10} />
        <div>
            {
                props.users.map(u => <User user={u}
                    followingInProgres={props.followingInProgres}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    key={u.id} />)
            }
        </div>
    </div>
}

export default Users;