import './App.css';
import Auth from './views/Auth';
import Home from './views/Home';
import Layout from './'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;