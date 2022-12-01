import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import ReactHtmlParser from 'react-html-parser';
import { numberWithComas } from '../Banner/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchList, removeFromWatchList } from '../store/actions/watchlistActions';

const useStyles=makeStyles((theme)=>({
container:{
  display:'flex',
  [theme.breakpoints.down("md")]:{
    flexDirection:'column',
    alignItems:'center',
  },
},
sidebar:{
  width:'30%',
  [theme.breakpoints.down("md")]:{
    width:'100%',
  },
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  marginTop:25,
  borderRight:'2px solid grey',
},
heading:{
  fontWeight:"bold",
  fontFamily:"Montserrat",
  marginBottom:20,
},
description:{
  width:'100%',
  fontFamily:'Montserrat',
  padding:25,
  paddingBottom:15,
  paddingTop:0,
  textAlign:'justify',
},
data:{
  alignSelf:'start',
  padding:25,
  paddingTop:10,
  width:"100%",
  [theme.breakpoints.down("md")]:{
    display:'flex',
    justifyContent:'space-around',
  },
  [theme.breakpoints.down("sm")]:{
    flexDirection:'column',
    alignItems:'center',
  },
  [theme.breakpoints.down("xs")]:{
    alignItems:'start'
  }
},
}))

const Coinpage = () => {
  // const {user,watchlist}=CryptoState();
  
//currency and symbol
const {userInfo}=useSelector(state=>state.userLogin);
const {watchlist}=useSelector(state=>state.WatchList);
//currency and symbol

const {currency,symbol}=useSelector(state=>state.currency);
////////
////////





  const {id}=useParams();
  const [coin,setCoin]=useState();
  const [inWatchlist,setInWatchList]=useState(false);
  const fetchCoins=async()=>{
    const {data}=await axios.get(SingleCoin(id));
    setCoin(data);
  }
  useEffect(()=>{
    fetchCoins();
  },[id]);
  const dispatch=useDispatch();
  const toggleAddTowatchList=()=>{
    if(inWatchlist)
    {
      dispatch(removeFromWatchList(userInfo,id));
      setInWatchList(false);
    }
    else
    {
      dispatch(addToWatchList(userInfo,id));
      setInWatchList(true);
    }
  }
  useEffect(()=>{
    const data=watchlist?.filter((c)=>c.coin===id);
    setInWatchList(data?.length===1);
  },[id,watchlist])
  const classes=useStyles();
  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}} />;
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {userInfo?<i className="fa-solid fa-heart"
      style={{
        fontSize:25,
        cursor:'pointer',
        position:'relative',
        left:'180px',
        color:inWatchlist?'red':'white',
      }}
      onClick={toggleAddTowatchList}
      ></i>:<></>}
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{
          marginBottom:20
        }}
        />
        <Typography
        variant='h3'
        className={classes.heading}
        >
          {coin?.name}
        </Typography>
        <Typography
        variant='subtitle2'
        className={classes.description}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.data}>
          <span
          style={{
            display:'flex',
          }}
          >
            <Typography
            variant='h5'
            className={classes.heading}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'
            style={{
              fontFamily:'Montserrat',

            }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span
          style={{
            display:'flex',
          }}
          >
            <Typography
            variant='h5'
            className={classes.heading}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'
            style={{
              fontFamily:'Montserrat',

            }}>
              {symbol}{" "}
              {numberWithComas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span
          style={{
            display:'flex',
          }}
          >
            <Typography
            variant='h5'
            className={classes.heading}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'
            style={{
              fontFamily:'Montserrat',

            }}>
              {symbol}{" "}
              {numberWithComas(
                coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)
              )}
              M
            </Typography>
          </span>

        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coinpage