import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SetUpProfile from './pages/SetUpProfile';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CoinList } from './config/api';
import { COIN_LIST } from './store/constants/coinConstants';
import { useEffect } from 'react';
const useStyles=makeStyles(() => ({
  App:{
    backgroundColor:'#14161a',
    color:'white',
    minHeight:'100vh',
  },
}));
function App() {
  const classes=useStyles();
  const dispatch=useDispatch();
  const {currency}=useSelector(state=>state.currency);
  const fetchCoins=async ()=>{
    const {data}=await axios.get(CoinList(currency));
    dispatch({type:COIN_LIST,payload:data});
}
// console.log(coins);
useEffect(()=>{
    fetchCoins();
},[currency]);
  return (
      <Router>
        <div className={classes.App}>
          <Header />
          <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/coins/:id' element={<Coinpage/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/setup-profile' element={<SetUpProfile/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
