import { profileAPI, usersAPI} from '../API/apiScript'
import userLogo from './../assets/images/userLogo.png'

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
const SET_USER_INFO = 'SET_USER_INFO'

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', like_count: 20, image: userLogo},
        { id: 2, message: "It's my first post!", like_count: 15, image: userLogo}
    ],
    profile: null,
    status: '',

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:{
            let newPost = {
                id: 3,
                message: action.text,
                like_count: 0,
                image: userLogo
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: 
            return{
                ...state,
                profile: action.profile
            }
        case SET_STATUS: {
            return{
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return{
                ...state,
                posts: state.posts.filter(p=>(p.id != action.postId))
            }
        }
        case SAVE_PHOTO_SUCCESS:{
            return{
                ...state,
                profile: {...state.profile, photoUrl: action.photos}
            }
        }
        case SET_USER_INFO: {
            return {
                ...state,
                profile: {...state.profile, ...action.data}
            }
        }
        default:
            return state;
    }
}

export const addPost = (text) => ({ type: ADD_POST , text})
export const setUserProfile = (profile)=>({type: SET_USER_PROFILE, profile})
export const setStatus = (status) =>({type:SET_STATUS, status})
export const deletePost = (postId) =>({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) =>({type: SAVE_PHOTO_SUCCESS, photos})
export const setProfileInfo = (data) =>({type: SET_USER_INFO, data})

export const getUserProfile=(userId)=>async(dispatch)=>{
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus=(userId)=>async(dispatch)=>{
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus=(status)=>async(dispatch)=>{
   let response = await profileAPI.updateStatus(status)
        if(response.data.resultCode == 0){  
            dispatch(setStatus(status))
        }      
}

export const savePhoto=(file)=>async(dispatch)=>{
    try{
        let response = await profileAPI.savePhoto(file);
        if(response.data.resultCode == 0){  
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }catch(error){
        alert(error.message)
    }
}

export const saveProfile = (formData)=> async(dispatch)=>{
    let response = await profileAPI.saveProfile(formData)
        const data = response.config.data;
        if(response.data.resultCode === 0){
            dispatch(setProfileInfo(data))
        } 
}

export default profileReducer;