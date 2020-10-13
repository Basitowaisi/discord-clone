import React, {useEffect} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
// import { selectUser } from "./features/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(login({
          uid: user.uid,
          photo: user.photoURL,
          email: user.email,
          displayName: user.displayName
        }))
      }else {
        dispatch(logout)
      }
    })
  },  [dispatch])
  return (
    <div className="app">
      { user ? <> 
        <Sidebar />
      <Chat />
      </> : <Login /> }
      
    </div>
  );
}

export default App;
