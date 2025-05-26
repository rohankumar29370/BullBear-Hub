import { useState } from 'react'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx'
import About from './components/About.jsx'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Market from './components/Market.jsx';
import Portfolio from './components/Portfolio.jsx';
import Registration from './components/Registration.jsx';

function App() {

  const [user, setUser] = useState({
     user: '',
     userId: -1,
     balance: 0,
     isLoggedIn: false,
  });

  const handleLogout = () =>{
    setUser({
      user: '',
      userId: -1,
      balance: 0,
      isLoggedIn: false,
    });
  }

 return (
 <>
 <Router>
  {user.isLoggedIn && <Navbar  handleLogout = {handleLogout} />}
  <Routes>
    <Route path="/login" element={!user.isLoggedIn ? <Login setUser={setUser} /> : <Navigate to="/home" />} />
    <Route path="/register" element={!user.isLoggedIn ? <Registration setUser={setUser} /> : <Navigate to="/home" />} />
    <Route path="/home" element={user.isLoggedIn ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
    <Route path="/about" element={user.isLoggedIn ? <About /> : <Navigate to="/login" />} />
    <Route path="/market" element={user.isLoggedIn ? <Market user={user} /> : <Navigate to="/login" />} />
    <Route path="/portfolio" element={user.isLoggedIn ? <Portfolio user={user} /> : <Navigate to="/login" />} />
    <Route path="/" element={<Navigate to={user.isLoggedIn ? "/home" : "/login"} />} />
  </Routes>
  </Router>
  
 </ >


);
}

export default App
