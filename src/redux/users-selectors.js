import {createSelector} from 'reselect'

const getUsersSelctor=(state)=>{
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelctor, (users) => {
    return users.filter((s)=> true)
})

export const getPageSize=(state)=>{
    return state.usersPage.pageSize
}

export const getTotalUsersCount=(state)=>{
    return state.usersPage.totalUsersCount
}

export const getCurrentPage=(state)=>{
    return state.usersPage.currentPage
}

export const getIsFetching=(state)=>{
    return state.usersPage.isFetching
}

export const getFollowingInProgres=(state)=>{
    return state.usersPage.followingInProgres
}