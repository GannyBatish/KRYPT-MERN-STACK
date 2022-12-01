import { COIN_LIST, SET_CURRENCY, TRENDING_COINS } from "../constants/coinConstants";

export const currencyReducer=(state={currency:'INR',symbol:'₹'},action)=>{
    switch(action.type)
    {
        case SET_CURRENCY:
            return {currency:action.payload,symbol:action.symbol}
        default:
            return state;
    }
}
export const TrendingCoinReducer=(state={coins:[]},action)=>{
    switch(action.type)
    {
        case TRENDING_COINS:
            return {coins:action.payload};
        default:
            return state;
    }
}
export const CoinListReducer=(state={coins:[]},action)=>{
    switch(action.type)
    {
        case COIN_LIST:
            return {coins:action.payload};
        default:
            return state;
    }
}