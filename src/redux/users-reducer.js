import { usersAPI } from './../API/apiScript';
import { updateObjectInArray } from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgres: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRES: {
            return {
                ...state,
                followingInProgres: action.isFetched 
                    ? [...state.followingInProgres, action.userId] 
                    : state.followingInProgres.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_PAGES, count: totalUsersCount })
export const toggleFetching = (isFetched) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetched })
export const toggleIsFollowingProgres = (isFetched, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFetched: isFetched, userId })


export const requestUsers = (page) => async(dispatch) => {
    dispatch(toggleFetching(true));
    dispatch(setPage(page))
    let response = await usersAPI.getUsers(page)
        dispatch(toggleFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setUsersTotalCount(response.totalCount));
}

const followUnfollowFlow = async(dispatch, userId, apiMethod, actionCreator)=>{
    dispatch(toggleIsFollowingProgres(true, userId));
    let response = await apiMethod(userId)
        dispatch(actionCreator(userId));
        dispatch(toggleIsFollowingProgres(false, userId));
}

export const follow = (userId) => async(dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess)
}

export const unfollow = (userId) => async(dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unFollow, unfollowSuccess)
}

export default usersReducer;