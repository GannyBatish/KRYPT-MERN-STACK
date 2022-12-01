import { ADD_TO_WATCHLIST_FAIL, ADD_TO_WATCHLIST_REQUEST, ADD_TO_WATCHLIST_SUCCESS, DEL_FROM_WATCHLIST_FAIL, DEL_FROM_WATCHLIST_REQUEST, DEL_FROM_WATCHLIST_SUCCESS, GET_WATCHLIST_FAIL, GET_WATCHLIST_REQUEST, GET_WATCHLIST_SUCCESS } from "../constants/watchlistConstants";

export const WatchlistReducer=(state={watchlist:[]},action)=>{
    switch (action.type) {
        case GET_WATCHLIST_REQUEST:
            return {loading:true};
        case GET_WATCHLIST_SUCCESS:
            return {loading:false,watchlist:action.payload};
        case GET_WATCHLIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
};


export const addToWatchListReducer=(state={},action)=>{
    switch (action.type) {
        case ADD_TO_WATCHLIST_REQUEST:
            return {loading:true};
        case ADD_TO_WATCHLIST_SUCCESS:
            return {loading:false,watchlist:action.payload};
        case ADD_TO_WATCHLIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
};

export const removeFromwatchListReducer=(state={},action)=>{
    switch (action.type) {
        case DEL_FROM_WATCHLIST_REQUEST:
            return {loading:true};
        case DEL_FROM_WATCHLIST_SUCCESS:
            return {loading:false,watchlist:action.payload};
        case DEL_FROM_WATCHLIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
};