import './App.css';
import Auth from './views/Auth';
import Home from './views/Home';
import JoinRoom from './views/JoinRoom';
import Room from './views/Room';
import Account from './views/Account';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import axios from "axios";

function App() {
  async function HandleAccountPageEnter() {
    if (localStorage.getItem('token' !== null)) {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/profile/');
  
      console.log(JSON.parse(response.data));
      const email = response.data.data[0];
      const username = response.data.data[1];
  
      localStorage.setItem('email', JSON.stringify(email));
      localStorage.setItem('username', JSON.stringify(username));
    }
  }

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home />} />
                  <Route exact path="/auth" element={<Auth />} />
                  <Route exact path="/home" element={<JoinRoom />} />
                  <Route exact path="/room/:room" element={<Room />} />
                  <Route path="/account" element={<Account />} onEnter={HandleAccountPageEnter} />
                  <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          </BrowserRouter>
      </>
  );

}



export default App;



