import { Button, CircularProgress, Container, createTheme, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { updateProfile } from '../store/actions/userActions';
const useStyles=makeStyles((theme)=>({
  container:{
    height:'91vh',
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'url("../banner2.jpg") no-repeat',
    // border:'2px solid red',
    flexDirection:'column'
  },
  signin:{
    // width:'450px',
    width:'100%',
    height:'450px',
    // border:'2px solid white',
    borderRadius:'10%',
    borderTopLeftRadius:'0px',
    borderTopRightRadius:'0px',
    // background: 'rgba(255,255,255,0.1)',
    // WebkitBackdropFilter: 'blur(10px)',
    // backdropFilter: 'blur(10px)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  },
  err:{
    height:'50px',
    width:"450px",
    // // background: 'rgba(255,0,0,0.5)',
    // WebkitBackdropFilter: 'blur(10px)',
    // backdropFilter: 'blur(10px)',
    borderRadiusTopRight:'10%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    borderTopRightRadius:'30px',
    borderTopLeftRadius:'30px',
    paddingLeft:'20px',
    [theme.breakpoints.down("xs")]:{
      width:"100%",
    }
  },
  div:{
    [theme.breakpoints.down("xs")]:{
      width:'90%',
    }
  },
  cont:{
    width:'100%',
    height:'90vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
},
innerdiv:{
    width:'900px',
    height:'500px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
},
data:{
    width:'55%',
    height:'500px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    gap:'25px',
},
profile:{
    marginTop:'30px',
    marginBottom:'30px',
    width:'100%',
    height:'200px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
},
input:{
    color:'lightgrey',
},
textfield:{
    borderColor:'lightgrey'
},
loginbtn:{
    width:85,
    height:40,
    backgroundColor:'#EEBC1D',
    '&:hover':{
        backgroundColor:'lightgrey',
    }
},
helper:{
    color:'red'
},
edit:{
    position:'absolute',
    width:'200px',
    height:'200px',
    zIndex:'1',
    borderRadius:'50%',
    backgroundColor:'rgb(0,0,0,0.7)',
},
loadingcont:{
    width:'100%',
    height:'90vh',
    background: 'rgba(255,255,255,0.1)',
    WebkitBackdropFilter: 'blur(200px)',
    backdropFilter: 'blur(200px)',
}
}))

const SetUpProfile = () => {
    const [picLoad,setPicLoad]=useState(false);
  const history=useNavigate();
  const darkTheme=createTheme({
    palette:{
        primary:{
            main:"#fff"
        },
        type:'dark'
    },
})
const [pic,setPic]=useState('https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png');
  const classes=useStyles();
  const [visible,setVisible]=useState(false);
  const inputRef=useRef(null);
  const click=()=>{
      inputRef.current.click();
  }
  const postDetails=(pic)=>{
      if(pic.type==='image/png' || pic.type==='image/jpeg' || pic.type==='image/jpg')
      {
          const data=new FormData();
          data.append('file',pic);
          data.append('upload_preset','kryptApp');
          data.append('cloud_name','dq9wd8ffd');
          setPicLoad(true);
          fetch('https://api.cloudinary.com/v1_1/dq9wd8ffd/image/upload',{
              method:'post',
              body:data,
          }).then((res)=>res.json()).then((data)=>{
              setPic(data.url.toString());
              // console.log(data.url.toString());
              setPicLoad(false);
          }).catch((err)=>{
              console.log(err);
              setPicLoad(false);
          })
      }
      else
      {
          console.log('File Type Error');
      }
  }
  const dispatch=useDispatch();
  const {profileData}=useSelector(state=>state.userProfile);
  const submit=()=>{
    dispatch(updateProfile('','','',pic,profileData));
    history('/');
  }
  return (
    <ThemeProvider theme={darkTheme}>
    <div className={classes.container}>
      <div
      className={classes.div}
      style={{
        // border:'2px solid red',
        background: 'rgba(255,255,255,0.1)',
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
        borderRadius:'10%',
      }}
      >
      <Container className={classes.signin}
      >
        <ThemeProvider theme={darkTheme}>
        <form
        style={{
          height:"100%",
          width:'100%',
          // border:'2px solid red',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column',
        }}
        className={classes.form}
        >
          <Typography
          variant='h4'
          style={{
            fontFamily:'Montserrat',
            fontWeight:"500",
          }}
          >
            Setup Profile Picture
          </Typography>
          <div className={classes.profile}>
            {picLoad && 
            <div style={{
                position:'absolute',
                width:'200px',
                height:'200px',
                background: 'rgba(0,0,0,0.5)',
                WebkitBackdropFilter: 'blur(200px)',
                backdropFilter: 'blur(200px)',
                zIndex:2,
                borderRadius:'50%',
            }}>
            <div
            style={{
        //   background: 'rgba(255,255,255,0.1)',
        //   WebkitBackdropFilter: 'blur(200px)',
        //   backdropFilter: 'blur(200px)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          borderRadius:'50%',
          width:'200px',
          height:'200px',
        }}
        >
          <CircularProgress
            style={{ color: "gold" }}
            size={100}
            thickness={1}
          />
        </div>
        </div>
        }
                <div className={classes.edit}
                onMouseOut={()=>setVisible(false)}
                style={{
                    display:visible?'block':'none',
                    cursor:'pointer',
                }}
                onClick={click}
                >
                    <div style={{
                        position:'absolute',
                        bottom:'0',
                        right:'85px',
                        top:'70%',
                    }}>
                    <div style={{
                        backgroundColor:'rgb(65,105,225)',
                        width:'fit-content',
                        padding:'2px',
                        paddingLeft:'5px',
                        paddingRight:'5px',
                        borderRadius:'50%'
                    }}>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <span>Edit</span>
                    </div>
                </div>
                    <img src={pic}
                    alt={'Profile'}
                    style={{
                        border:'2px solid white',
                        cursor:'pointer',
                        position:'absolute',
                        zIndex:'0',
                        backgroundColor:'white',
                        borderRadius:'50%',
                        width:'200px',
                        height:'200px'
                    }} 
                    onMouseOver={()=>{setVisible(true)}}
                    className={`img ${classes.image}`}
                    />
                    <input type="file"
                    style={{
                        display:'none',
                    }}
                    accept="image/png, image/jpeg, image/jpg" ref={inputRef}
                    onChange={(e)=>{
                        postDetails(e.target.files[0]);
                    }}
                    />
            </div>
      <Button
      variant='contained'
      style={{
        backgroundColor:'gold',
        width:'25%',
      }}
      onClick={submit}
      >
        NEXT
      </Button>
        </form>
        </ThemeProvider>
      </Container>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default SetUpProfile