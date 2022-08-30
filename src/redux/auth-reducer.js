import { authAPI, securityAPI } from "../API/apiScript";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null, //if null then captcha is not required
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    } 
}


export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA , payload: {userId, email, login, isAuth}})
export const setCaptchaUrl = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS , payload: {captchaUrl}})

export const getAuthUserData = () => async (dispatch) =>{
    let response = await authAPI.me()
    if(response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
        if(response.data.resultCode === 0){
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
        }
}

export const logout = () => async (dispatch) =>  {
    let response = await authAPI.logOut()
        if(response.data.resultCode === 0){
            dispatch(setAuthUserData(null, null, null, false))
        }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer;