import React, { useEffect } from 'react';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { numberWithComas } from '../Banner/Carousel';
import { getWatchList, removeFromWatchList } from '../store/actions/watchlistActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'rgb(20, 22, 26,0.9)',
    color:'white',
    width:'500px',
    height:'500px',
    border: '2px solid white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logoutbtn:{
    width:'100%',
    height:40,
    // backgroundColor:'#EEBC1D',
  },
  watchlist:
  {
    flex:1,
    width:'100%',
    height:'450px',
    backgroundColor:'transparent',
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    borderRadius:'10px',
  },
  coin:{
    width:'85%',
    height:'25px',
    padding:'10px',
    borderRadius:'5px',
    display:'flex',
    flexDirection:'row',
    marginBottom:10,
    color:'black',
    justifyContent:'space-between',
    marginLeft:'20px',
    alignItems:'center',
    backgroundColor:'white',
  },
  drawer:{
    background:'transparent'
    // background: 'rgba(255,255,255,0.1)',
    // WebkitBackdropFilter: 'blur(10px)',
    // backdropFilter: 'blur(10px)',
  },
  delete:{
    transition:'all 0.5s',
    '&:hover':{
      color:'red',
      transform:'scale(1.2)',
    }
  },
  empty:{
    background:'url(../empty.png)',
    backgroundSize:'cover',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    width:'100%',
    height:'200px',
    marginBottom:'30px',
  }
}));
export default function WatchList() {
  const darkTheme=createTheme({
    palette:{
        primary:{
            main:"#fff",
        },
        type:"dark",
    }
});
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const {coins}=useSelector(state=>state.coinsList);
const {userInfo}=useSelector(state=>state.userLogin);
const {watchlist}=useSelector(state=>state.WatchList);
const {symbol}=useSelector(state=>state.currency);
const history=useNavigate();
const goto=(id)=>{
  history(`/coins/${id}`);
  handleClose();
}
const rem=(coin)=>{
  dispatch(removeFromWatchList(userInfo,coin));
}
const dispatch=useDispatch();
useEffect(()=>{
  if(userInfo)
  {
    dispatch(getWatchList(userInfo));
  }
},[dispatch,userInfo])
  return (
    <ThemeProvider theme={darkTheme}>
      <div
      onClick={handleOpen}
      style={{
                    color:'white',
                    cursor:'pointer',
                    width:'40px',
                    height:'40px',
                }}>
                    <i style={{
                        fontSize:'40px',
                        color:'red'
                    }} className="fa-brands fa-gratipay"></i>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div
                className={classes.watchlist}
                >
                  <div
                    style={{
                        fontSize:15,
                        width:'100%',
                        height:'25px',
                        textAlign:'center',
                        textShadow:'0 0 5px black',
                        marginBottom:'10px',
                    }}
                    >Watchlist</div>
                    <div
                    style={{
                      width:'100%',
                      height:'100%',
                      marginTop:'10px',
                      overflowY:'scroll',
                      scrollbarColor:'red white',
                      WebkitScrollbarThumb:'gold',
                    }}
                    >
                    {watchlist?.length===0 &&  
                    <div style={{
                      width:'100%',
                      height:'100%',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      flexDirection:'column',
                    }}>
                      <div className={classes.empty}></div>
                      <h1>WatchList is Empty!!</h1>
                    </div>
                    }
                    {watchlist?.map((c)=>{
                      return (
                        <>
                        {coins.filter(c1=>c1.id===c.coin).map((coin)=>{
                          return <div className={classes.coin}
                          >
                            <div
                            style={{
                              display:'flex',
                              justifyContent:'center',
                              alignItems:'center',
                              cursor:'pointer',
                            }}
                            onClick={()=>{goto(coin.id,false)}}
                            >
                            <img 
                            style={{
                              width:'15px',
                              height:'15px',
                              marginRight:'5px',
                            }}
                            src={coin.image}
                            alt={coin.name}
                            />
                            <span
                            // onClick={}
                            >{coin.name}</span>
                            </div>
                            <span>
                              {symbol}
                              &nbsp;
                              {numberWithComas(coin.current_price.toFixed(2))}
                              &nbsp;&nbsp;
                              <i className={[classes.delete,' fa-solid fa-trash'].join(' ')}
                              style={{
                                cursor:'pointer',
                              }}
                              onClick={()=>{rem(coin.id)}}
                              ></i>
                            </span>
                          </div>
                        })}
                        </>
                      )
                    })}
                    </div>
                </div>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}
