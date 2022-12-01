import axios from "axios";
import { PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE, USER_PROFILE_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"


export const login = (email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST});
        const config={
            headers:{
                "Content-type":"application/json",
            },
        }
        const {data}=await axios.post("/auth/login",{email,password},config);
        localStorage.setItem("userInfo",JSON.stringify(data));
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});

        //for profile
        const pconfig={
            headers:{
                "Content-type":"application/json",
                'Authorization':'Bearer '+data.token,
            },
        }
        const profile=await axios.get("auth/profile",pconfig);
        localStorage.setItem("profileData",JSON.stringify(profile.data));
        dispatch({type:USER_PROFILE,payload:profile.data});

    }catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }
}

export const logout=()=>async(dispatch)=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("profileData");
    dispatch({type:USER_LOGOUT});
    dispatch({type:USER_PROFILE_LOGOUT});
    dispatch({type:USER_REGISTER_LOGOUT});
};


export const register=(name,email,password,pic)=>async(dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST});
        const config={
            headers:{
                'Content-type':'application/json',
            },
        };

        const {data}=await axios.post('/auth/signup',{name,email,password,pic},config);
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data));
        //for profile
        const pconfig={
            headers:{
                "Content-type":"application/json",
                'Authorization':'Bearer '+data.token,
            },
        }
        const profile=await axios.get("auth/profile",pconfig);
        localStorage.setItem("profileData",JSON.stringify(profile.data));
        dispatch({type:USER_PROFILE,payload:profile.data});
    }
    catch(error){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }
}

export const updateProfile=(name,email,password,pic,currProfile)=>async(dispatch)=>{
    try{
        dispatch({type:PROFILE_UPDATE_REQUEST});
        const pconfig={
            headers:{
                "Content-type":"application/json",
                'Authorization':'Bearer '+currProfile.token,
            },
        }
        const {data}=await axios.patch("auth/profile",{name,email,password,pic},pconfig);
        localStorage.setItem("profileData",JSON.stringify(data));
        dispatch({type:PROFILE_UPDATE_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({
            type:PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
            prevProfile:currProfile
        })
    }
}