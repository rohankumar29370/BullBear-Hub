import { useState } from 'react'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx'
import About from './components/About.jsx'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Market from './components/Market.jsx';
import Portfolio from './components/Portfolio.jsx';

function App() {

  const [user, setUser] = useState({
     user: '',
     userId: -1,
     isLoggedIn: false,
  });

  const handleLogout = () =>{
    setUser({
      user: '',
      userId: -1,
      isLoggedIn: false,
    });
  }

 return (
 <>
 <Router>
  {user.isLoggedIn && <Navbar  handleLogout = {handleLogout} />}
  <Routes>
    <Route path= "/" element={user.isLoggedIn ? <Home user={user} onLogout={handleLogout} /> : <Login setUser={setUser} />} />
    <Route path="/home" element={user.isLoggedIn ? <Home user={user} onLogout={handleLogout} /> : <Login setUser={setUser} />} />
    <Route path= "/about" element={user.isLoggedIn ? <About /> : <Login setUser={setUser} />} />
    <Route path= "/market" element={user.isLoggedIn ? <Market /> : <Login setUser={setUser} />} />
    <Route path= "/portfolio" element={user.isLoggedIn ? <Portfolio /> : <Login setUser={setUser} />} />
  </Routes>
  </Router>
  
 </ >


);
}

export default App
