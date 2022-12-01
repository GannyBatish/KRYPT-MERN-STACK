import { Button, CircularProgress, Container, createTheme, makeStyles, TextField, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../store/actions/userActions';
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
    height:'500px',
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
  }
}))

const Login = () => {

  const history=useNavigate();
  const darkTheme=createTheme({
    palette:{
        primary:{
            main:"#fff"
        },
        type:'dark'
    },
})
const handleIcon=()=>{
  if(icon==='fa-solid fa-eye-slash')
  {
    setIcon('fa-solid fa-eye');
    setType('text');
  }
  else
  {
    setIcon('fa-solid fa-eye-slash');
    setType('password');
  }
}
const handleCIcon=()=>{
  if(cicon==='fa-solid fa-eye-slash')
  {
    setCIcon('fa-solid fa-eye');
    setCType('text');
  }
  else
  {
    setCIcon('fa-solid fa-eye-slash');
    setCType('password');
  }
}
  const classes=useStyles();


  const dispatch=useDispatch();
  const {userInfo,loading,error}=useSelector(state=>state.userRegister);
  const [type,setType]=useState('password');
  const [icon,setIcon]=useState('fa-solid fa-eye-slash');
  const [ctype,setCType]=useState('password');
  const [cicon,setCIcon]=useState('fa-solid fa-eye-slash');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loginErr,setLoginErr]=useState('');
  const [err,setErr]=useState(false);
  const [confirm,setConfirm]=useState('');
  const [name,setName]=useState('');

  useEffect(()=>{
    if(userInfo){
      history('/setup-profile');
    }
  },[history,userInfo])
  useEffect(()=>{
    if(error){
      setErr(true);
    }
  },[history,error]);
  const submit=()=>{
    if(name==='' || confirm==='' || password==='' || email==='')
    {
      setLoginErr('Please Fill all the Fields');
      return;
    }
    if(name.length<5)
    {
      setLoginErr('Name must contains at least 5 characters');
    }
    if(!email.includes("@gmail.com"))
    {
      setLoginErr('Invalid Email Address');
      return;
    }
    if(password.length<8)
    {
      setLoginErr('Password must contains at least 8 characters');
      return;
    }
    if(password!==confirm)
    {
      setLoginErr('Password and Confirm Password does not match');
      return;
    }
    dispatch(register(name,email,password,'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png'));
    setLoginErr('');
  }
  

  return (
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
      <div
      className={classes.err}
      style={{
        backgroundColor:loginErr || (error && err)?'rgb(255, 49, 49,0.8)':'transparent',
      }}
      >
        {loginErr || (error && err)?(<div
        style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
        }}
        ><i 
        style={{
          marginRight:'7px',
        }}
        className="fa-solid fa-circle-info"></i>
        <Typography
        style={{
          textTransform:'capitalize',
        }}
        >{loginErr || error}</Typography></div>)
        :<></>}
        {loginErr || (error && err)?<i className="fa-solid fa-xmark" style={{
          marginRight:'20px',
          cursor:'pointer'
        }}
        onClick={()=>{setLoginErr('');setErr(!err)}}></i>:<></>}
      </div>
      <Container className={classes.signin}
      style={{
        filter:(loading?'blur(40px)':'blur(0px)'),
      }}
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
            SIGN UP
          </Typography>
          <TextField
        label="Name"
        variant="outlined"
        style={{
          width:"75%",
          marginTop:20,

        }}
        onChange={(e)=>{setName(e.target.value)}}
      />
        <TextField
        label="Email"
        variant="outlined"
        style={{
          width:"75%",
          marginTop:20,

        }}
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <TextField
      style={{
        width:"75%",
        marginTop:20,
        marginBottom:20,
      }}
        label="Password"
        variant="outlined"
        type={type}
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <i className={icon}
      style={{
        position:'absolute',
        bottom:'250px',
        right:'90px',
        cursor:'pointer',
      }}
      onClick={handleIcon}
      ></i>
      <TextField
      style={{
        width:"75%",
        marginBottom:20,
      }}
        label="Confirm Password"
        variant="outlined"
        type={ctype}
        onChange={(e)=>{setConfirm(e.target.value)}}
      />
      <i className={cicon}
      style={{
        position:'absolute',
        bottom:'175px',
        right:'90px',
        cursor:'pointer',
      }}
      onClick={handleCIcon}
      ></i>


      <Button
      variant='contained'
      style={{
        backgroundColor:'gold',
        width:'25%',
      }}
      onClick={submit}
      >
        Sign Up
      </Button>
      <Typography
      style={{
        marginTop:'20px',
      }}
      >Already have an Account? <Link to='/login'>Login</Link></Typography>
      <div
      style={{
        width:'100%',
        height:'60px',
        marginTop:'20px',
        display:'flex',
        justifyContent:'space-evenly',
        flexDirection:'column',
        alignItems:'center',
        // border:'2px solid red',
      }}>
      </div>
        </form>
        </ThemeProvider>
      </Container>
      </div>
      {loading?
        <div
        style={{
          width:"100%",
          height:"90%",
          position:'absolute',
          // background: 'rgba(255,255,255,0.1)',
          // WebkitBackdropFilter: 'blur(200px)',
          // backdropFilter: 'blur(200px)',
          zIndex:1,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        }}
        >
          <CircularProgress
            style={{ color: "gold" }}
            size={100}
            thickness={1}
          />
        </div>:<></>}
    </div>
  )
}

export default Login