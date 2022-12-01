import { Button, CircularProgress, createTheme, makeStyles, TextField, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../store/actions/userActions';

const useStyle=makeStyles((theme)=>({
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
        width:'45%',
        height:'500px',
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
        width:'300px',
        height:'300px',
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

const Profile = () => {
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:'dark'
        },
    })
    const classes=useStyle();
    const {profileData,loading,error}=useSelector((state)=>state.userProfile);
    const {userInfo}=useSelector((state)=>state.userLogin);
    const dispatch=useDispatch();
    const history=useNavigate();
    useEffect(()=>{
        if(!userInfo)
        {
            history('/');
        }
    },[userInfo])
    const [picLoad,setPicLoad]=useState(false);
    const [name,setName]=useState(profileData?.name);
    const [email,setEmail]=useState(profileData?.email);
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
    const [disabledBtn,setDisabledBtn]=useState(true);
    const [nameErr,setNameErr]=useState('');
    const [emailErr,setEmailErr]=useState('');
    const [passErr,setPassErr]=useState('');
    const [confirmErr,setConfirmErr]=useState('');
    const [pic,setPic]=useState(profileData?.pic);
    useEffect(()=>{
        if(name!==profileData?.name || email!==profileData?.email || (password!=='' && confirm!=='') || pic!==profileData.pic)
        {
            setDisabledBtn(false);
        }
        else
        {
            setDisabledBtn(true);
        }
    },[name,email,password,confirm,pic]);
    const submit=()=>{
        if(name.length<5)
        {
            setNameErr('Name must contains atleast 5 characters');
            return;
        }
        else
        {
            setNameErr('');
        }
        if(!email.includes('@gmail.com'))
        {
            setEmailErr('Email address is invalid');
            return;
        }
        else
        {
            setEmailErr('');
        }
        if(password.length<8 && password!=='')
        {
            setPassErr('Password must contains atleast 8 characters');
            return;
        }
        else
        {
            setPassErr('');
        }
        if(password!==confirm)
        {
            setConfirmErr('Password and Confirm Password doesnot match');
            return;
        }
        else
        {
            setConfirmErr('');
        }
        if(nameErr==='' && emailErr==='' && passErr==='' && confirmErr==='')
        {
            dispatch(updateProfile(name,email,password,pic,profileData));
        }
    }
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
  return (
    <ThemeProvider theme={darkTheme}>
    <div className={classes.loadingcont} style={{
        display:loading?'flex':'none',
        alignItems:'center',
        justifyContent:'center',
    }}>
    {loading && 
        <div
        style={{
          width:"100%",
          height:"90%",
          position:'absolute',
        //   background: 'rgba(255,255,255,0.1)',
        //   WebkitBackdropFilter: 'blur(200px)',
        //   backdropFilter: 'blur(200px)',
          zIndex:1,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
        }}
        >
          <CircularProgress
            style={{ color: "gold" }}
            size={200}
            thickness={2}
          />
        </div>}
    </div>
    <div className={classes.cont}>
        <div className={classes.innerdiv}>
            <div className={classes.data}>  
                <TextField
                value={name}
                    id="standard-full-width"
                    label="Name"
                    style={{ margin: 8,width:'80%',color:'white'}}
                    margin="normal"
                    helperText={nameErr}
                    FormHelperTextProps={{
                        className:classes.helper
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className:classes.input
                    }}
                    InputProps={{
                        className:classes.textfield
                    }}
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <TextField
                value={email}
                    id="standard-full-width"
                    label="Email"
                    style={{ margin: 8,width:'80%',color:'white'}}
                    margin="normal"
                    helperText={emailErr}
                    FormHelperTextProps={{
                        className:classes.helper
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className:classes.input
                    }}
                    InputProps={{
                        className:classes.textfield
                    }}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <TextField
                type="password"
                value={password}
                    id="standard-full-width"
                    label="Password"
                    style={{ margin: 8,width:'80%',color:'white'}}
                    margin="normal"
                    helperText={passErr}
                    FormHelperTextProps={{
                        className:classes.helper
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className:classes.input
                    }}
                    InputProps={{
                        className:classes.textfield
                    }}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <TextField
                type="password"
                value={confirm}
                    id="standard-full-width"
                    label="Confirm Password"
                    style={{ margin: 8,width:'80%',color:'white'}}
                    margin="normal"
                    helperText={confirmErr}
                    FormHelperTextProps={{
                        className:classes.helper
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className:classes.input
                    }}
                    InputProps={{
                        className:classes.textfield
                    }}
                    onChange={(e)=>{setConfirm(e.target.value)}}
                />
                <div>
                <Button variant="contained"
                    className={classes.loginbtn}
                    disabled={disabledBtn}
                    onClick={submit}
                >Save</Button>
                </div>
            </div>
            <div className={classes.profile}>
            {picLoad && 
            <div style={{
                position:'absolute',
                width:'300px',
                height:'300px',
                background: 'rgba(255,255,255,0.1)',
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
          width:'300px',
          height:'300px',
          borderRadius:'50%',
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
                        right:'130px',
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
                    <img src={pic} style={{
                        border:'2px solid white',
                        cursor:'pointer',
                        position:'absolute',
                        zIndex:'0',
                        backgroundColor:'white',
                        borderRadius:'50%',
                        width:'300px',
                        height:'300px'
                    }} 
                    onMouseOver={()=>{setVisible(true)}}
                    className={`img ${classes.image}`}
                    />
                    <input type="file"
                    accept="image/png, image/jpeg, image/jpg" ref={inputRef}
                    onChange={(e)=>{
                        postDetails(e.target.files[0]);
                    }}
                    />
            </div>
        </div>
    </div>
    </ThemeProvider>
  )
}

export default Profile