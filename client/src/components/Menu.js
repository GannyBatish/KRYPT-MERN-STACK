import React from 'react';
import {useNavigate} from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  profile:{
    width:'38px',
    height:'38px',
    // border:'2px solid white',
    background:'white',
    borderRadius:'20%',
    cursor:'pointer',
  },
  menuItem:{
    '&:hover':{
      background:'gold',
      color:'black'
    }
  }
}));

export default function Menu(){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const history=useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // const prevOpen = React.useRef(open);
  const {profileData}=useSelector((state)=>state.userProfile);
  const dispatch=useDispatch();
  const logoutUser=()=>{
    dispatch(logout());
  }
  const openProfile=()=>{
    history('/profile');
  }
  return (
    <div className={classes.root}>
      <div>
        <img src={profileData?.pic} className={classes.profile} 
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        />
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem className={classes.menuItem} onClick={()=>{setOpen(false);openProfile();}}><i class="fa-solid fa-user"></i>&nbsp; &nbsp; Profile</MenuItem>
                    <MenuItem className={classes.menuItem} onClick={()=>{setOpen(false);logoutUser();}}><i class="fa-solid fa-arrow-right-from-bracket"></i> &nbsp; &nbsp;Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}