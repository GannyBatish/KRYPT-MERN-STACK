import axios from "axios";
import { ADD_TO_WATCHLIST_FAIL, ADD_TO_WATCHLIST_REQUEST, ADD_TO_WATCHLIST_SUCCESS, DEL_FROM_WATCHLIST_FAIL, DEL_FROM_WATCHLIST_REQUEST, DEL_FROM_WATCHLIST_SUCCESS, GET_WATCHLIST_FAIL, GET_WATCHLIST_REQUEST, GET_WATCHLIST_SUCCESS } from "../constants/watchlistConstants"

export const getWatchList=(userInfo)=>async(dispatch)=>{
    try{
        dispatch({type:GET_WATCHLIST_REQUEST});
        const config={
            headers:{
                "Content-type":"application/json",
                Authorization:'Bearer '+userInfo.token
            },
        }
        const {data}=await axios.get('/watchlist',config);
        dispatch({type:GET_WATCHLIST_SUCCESS,payload:data});
    }catch(error)
    {
        dispatch({
            type:GET_WATCHLIST_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }
}


export const addToWatchList=(userInfo,coin)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADD_TO_WATCHLIST_REQUEST});
        const config={
            headers:{
                "Content-type":"application/json",
                'Authorization':'Bearer '+userInfo.token
            },
        }
        const {data}=await axios.get(`/watchlist/${coin}`,config);
        dispatch({type:ADD_TO_WATCHLIST_SUCCESS,payload:data});
        const {WatchList:{watchlist}}=getState();
        const newWatchlist=[...watchlist,data];
        dispatch({type:GET_WATCHLIST_SUCCESS,payload:newWatchlist});

    }catch(error)
    {
        dispatch({
            type:ADD_TO_WATCHLIST_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }
}
export const removeFromWatchList=(userInfo,coin)=>async(dispatch,getState)=>{
    try{
        dispatch({type:DEL_FROM_WATCHLIST_REQUEST});
        const config={
            headers:{
                "Content-type":"application/json",
                'Authorization':'Bearer '+userInfo.token
            },
        }
        const {data}=await axios.delete(`/watchlist/${coin}`,config);
        dispatch({type:DEL_FROM_WATCHLIST_SUCCESS,payload:data});
        const {WatchList:{watchlist}}=getState();
        const newWatchlist=watchlist.filter((c)=>c.coin!==coin);
        dispatch({type:GET_WATCHLIST_SUCCESS,payload:newWatchlist});
    }catch(error)
    {
        dispatch({
            type:DEL_FROM_WATCHLIST_FAIL,
            payload:error.response && error.response.data.message? error.response.data.message:error.message,
        })
    }
}