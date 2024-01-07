import './App.css';
import Auth from './views/Auth';
import Home from './views/Home';

import JoinRoom from './views/JoinRoom';
import Room from './views/Room';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  function requireAuth(nextState, replace, next) {
    if (!localStorage.getItem('token')) {
      replace({
        pathname: "/login",
        state: {nextPathname: nextState.location.pathname}
      })
    }

    next();
  }

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home />} />
                  <Route exact path="/auth" element={<Auth />} />
                  <Route exact path="/home" element={<JoinRoom />} />
                  <Route exact path="/room" element={<Room />} />
              </Routes> 
          </BrowserRouter>
      </>
  );
}

export default App;