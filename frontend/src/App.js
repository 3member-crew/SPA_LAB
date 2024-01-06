import './App.css';
import Auth from './views/Auth';
import JoinRoom from './views/JoinRoom';
import Room from './views/Room';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Auth />} />
                    <Route exact path="/home" element={<JoinRoom />} />
                    <Route exact path="/room" element={<Room />} />
                </Routes> 
            </BrowserRouter>
        </>
    );
}

export default App;