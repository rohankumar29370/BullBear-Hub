import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/registration.css';

const Registration = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [balance, setBalance] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const register = async (event) => {
        event.preventDefault();
        
        // Validate inputs
        if (!username || !password || !confirmPassword || !balance) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Validate balance
        const balanceNum = parseFloat(balance);
        if (isNaN(balanceNum) || balanceNum < 0) {
            toast.error('Please enter a valid balance amount');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Attempting to register user:', username);
            const base_url = 'http://127.0.0.1:5000';
            const url = `${base_url}/user/create-user`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    balance: balanceNum
                })
            });

            console.log('Registration response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 409) {
                    toast.error('Username already exists. Please choose a different username.');
                } else {
                    throw new Error(errorData.message || "Registration failed. Please try again.");
                }
                return;
            }
            
            const data = await response.json();
            console.log('Registration successful, user data:', data);
            
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.message || 'Failed to register. Please try again.');
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
                <h1>Sign Up</h1>
                <form onSubmit={register}>
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

                    <label>Confirm Password</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <span className="eye-icon" onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <label>Initial Balance ($)</label>
                    <input
                        type="number"
                        placeholder="Enter Initial Balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        disabled={isLoading}
                        min="0"
                        step="0.01"
                    />

                    <input 
                        type="submit" 
                        value={isLoading ? "Creating Account..." : "Sign Up"} 
                        disabled={isLoading}
                    />
                </form>
                <p className="switch-form">
                    Already have an account? <a href="/login">Sign In</a>
                </p>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Registration; 