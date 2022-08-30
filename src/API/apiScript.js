import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "692d40db-6987-4327-b980-f37c76a632a9"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unFollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        // console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    },
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(file){
        const formData = new FormData();
        formData.append('image', file);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    },
}

export const authAPI = {
    me(){
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null){
        return instance.post(`auth/login`,{ email, password, rememberMe, captcha })
    },
    logOut(){
        return instance.delete(`auth/login`)
    }
} 

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`)
    },
} 