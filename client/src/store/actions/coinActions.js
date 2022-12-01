import { SET_CURRENCY } from "../constants/coinConstants"

export const setCurrency=(currency,symb)=>async(dispatch)=>{
    dispatch({type:SET_CURRENCY,payload:currency,symbol:symb});
}
export const setTrendingCoins=(currency)=>async(dispatch)=>{

}