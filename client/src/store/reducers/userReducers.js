import { PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE, USER_PROFILE_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const userLoginReducer=(state={},action)=>{
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}


export const userRegisterReducer=(state={},action)=>{
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload}
        case USER_REGISTER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userprofileReducer=(state={},action)=>{
    switch (action.type) {
        case USER_PROFILE:
            return {profileData:action.payload};
        case PROFILE_UPDATE_REQUEST:
            return {loading:true};
        case PROFILE_UPDATE_SUCCESS:
            return {loading:false,profileData:action.payload};
        case PROFILE_UPDATE_FAIL:
            return {loading:false,error:action.payload,profileData:action.prevProfile}
        case USER_PROFILE_LOGOUT:
            return {}
        default:
            return state;
    }
}