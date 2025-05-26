import '../styles/navbar.css';
import logo from '../assets/defaultUserpic.jpg';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = ({handleLogout}) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (<> 
        <nav className="navbar">
            <div className="navbar-left">
                <img 
                    src={logo} 
                    alt="App Logo" 
                    className="navbar-logo"
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className='navbar-center'>
                <Link to="/portfolio" className="navbar-link">PORTFOLIO</Link>
                <Link to="market" className="navbar-link">MARKET</Link>
                <Link to="/about" className="navbar-link">ABOUT</Link>
            </div>
            <div className="navbar-right">
                <button onClick={() => handleLogout()} className ="navbar-button">Logout</button>
            </div>
        </nav>
    </>);
}

export default Navbar;