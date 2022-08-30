import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { follow, requestUsers, toggleIsFollowingProgres, unfollow } from "../../redux/users-reducer";
import { getCurrentPage, getFollowingInProgres, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import Preloader from "../common/preloader/Preloader";
import Users from './Users';

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage}  = this.props
        this.props.requestUsers(currentPage)
    }

    onPAgeChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber)
    }

    render() {
        return <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPAgeChanged={this.onPAgeChanged}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            toggleIsFollowingProgres={this.props.toggleIsFollowingProgres}
            followingInProgres={this.props.followingInProgres} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgres: getFollowingInProgres(state)
    }
}

export default compose( 
    connect(mapStateToProps, {
        follow,
        unfollow,
        toggleIsFollowingProgres,
        requestUsers,
    }),)(UsersContainer)
