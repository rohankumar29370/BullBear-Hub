import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';

const Login = ({ setUserInParentComponent }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const login = (event) => {
        event.preventDefault();
        if (username === "admin" && password === "admin") {
            setUserInParentComponent(prevState => ({
                ...prevState,
                user: username,
                isLoggedIn: true
            }));
        } else {
            toast.error("Login failed. Invalid credentials.", { autoClose: 3000 });
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
                    />

                    <label>Password</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="eye-icon" onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <input type="submit" value="Sign In" />
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
