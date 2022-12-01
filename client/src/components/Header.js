import { AppBar, Avatar, Button, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'  
import { setCurrency } from '../store/actions/coinActions';
import Menu from './Menu';
import WatchList from './WatchList';
const useStyles=makeStyles(() => ({
    title:{
        cursor:"pointer",
    },
    arrow:{
        // display:"none",
    },
    loginbtn:{
        width:85,
        height:40,
        backgroundColor:'#EEBC1D',
        '&:hover':{
            backgroundColor:'lightgrey',
        }
    }
}))
const Header = () => {
    
    const classes=useStyles();
    const history= useNavigate();
    //currency and symbol
    // const [currency,setCurrency]=useState('USD');
    // const symbol='$';
    ////////
    const dispatch=useDispatch();
    const {currency}=useSelector(state=>state.currency);
    const {userInfo}=useSelector((state)=>state.userLogin);
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        }
    });
    const signin=()=>{
        history("/login");
    }
    const id=window.location.href.split("/");
    // const id=atSignIn();
    const page=id[id.length-1];
    // console.log(page);
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar style={{
            display:'flex',
            justifyContent:(page==='login' || page==='signup' || page==='setup-profile')?'center':'space-between',
        }}>
            <div style={{
                position:'relative',
                cursor:'pointer',
                width:'100px',
                height:'30px',
                background:'url(../logo.png)',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat',
                backgroundSize:'100px 30px',
            }}
            onClick={()=>{history('/')}}
            >
            </div>
                <div style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'50px'
                }}>
                <Select variant="outlined"
                style={{
                    display:(page==='login' || page==='signup'|| page==='setup-profile')?"none":"",
                    width:100,
                    height:40,
                }}
                value={currency}
                onChange={(e)=>{
                    if(e.target.value==='INR')
                    {
                        dispatch(setCurrency(e.target.value,'₹'))
                    }
                    else
                    {
                        dispatch(setCurrency(e.target.value,'$'))
                    }
                }}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                {userInfo && (page!=='setup-profile' && page!=='signup' && page!=='login')?<WatchList/>:<></>}
                <div className={classes.div}
                style={{
                    display:(page==='login' || page=='signup' || page==='setup-profile')?"none":"block",
                }}
                >
                    {!userInfo?
                    <Button variant="contained"
                    className={classes.loginbtn}
                    onClick={signin}
                    >Login</Button>
                    :
                    <Menu/>
                    }
                 </div>
                </div>
            </Toolbar>
        </Container>
    </AppBar>
</ThemeProvider>
  )
}

export default Header








/*


<div className={classes.div}
                style={{
                    display:(page==='login' || page=='signup')?"none":"block",
                }}
                >
                    {user?
                    <SideBar/>
                    :
                    <Button variant="contained"
                    className={classes.loginbtn}
                    onClick={signin}
                    >Login</Button>
                    }
                 </div>



*/