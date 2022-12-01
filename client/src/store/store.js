import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import {userLoginReducer, userprofileReducer, userRegisterReducer} from './reducers/userReducers'
import { CoinListReducer, currencyReducer, TrendingCoinReducer } from './reducers/coinReducer';
import { addToWatchListReducer, removeFromwatchListReducer, WatchlistReducer } from './reducers/watchlistReducer';

const reducers=combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userProfile:userprofileReducer,
    currency:currencyReducer,
    trendingCoins:TrendingCoinReducer,
    coinsList:CoinListReducer,
    WatchList:WatchlistReducer,
    addToWatchlist:addToWatchListReducer,
    removefromWatchlist:removeFromwatchListReducer,
})

const userInfoFromLocalStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;
const profileFromLocalStorage=localStorage.getItem("profileData")?JSON.parse(localStorage.getItem("profileData")):null;
const initialState={
    userLogin:{userInfo:userInfoFromLocalStorage},
    userProfile:{profileData:profileFromLocalStorage},
};

const middleware=[thunk];

const store=createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;