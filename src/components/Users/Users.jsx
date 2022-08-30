import Paginator from "../../utils/Paginator/Paginator";
import User from "./User";
import s from "./Users.module.css"

let Users = (props) => {

    return <div className={s.user}>
        <Paginator totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPAgeChanged={props.onPAgeChanged}
            portionSize={10}
            userId={props.users.id} />
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