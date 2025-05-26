import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const login = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            console.log('Attempting to login user:', username);
            const base_url = 'http://127.0.0.1:5000';
            const url = `${base_url}/user/authenticate-user/${username}/${password}`;
            console.log('Login URL:', url);
            
            const response = await fetch(url);
            console.log('Login response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed. Invalid credentials.");
            }
            
            const data = await response.json();
            console.log('Login successful, user data:', data);
            
            setUser({
                user: data.user.username,
                userId: data.user.id,
                balance: data.user.balance,
                isLoggedIn: true
            });
            
            console.log('User state updated, navigating to home');
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.message || `Failed to authenticate user ${username}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-body">
            <video autoPlay muted loop className="background-video">
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="signin-container">
                <h1>Sign In</h1>
                <form onSubmit={login}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                    />

                    <label>Password</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <span className="eye-icon" onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <input 
                        type="submit" 
                        value={isLoading ? "Signing in..." : "Sign In"} 
                        disabled={isLoading}
                    />
                </form>
                <p className="switch-form">
                    Don't have an account? <a href="/register">Sign Up</a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
