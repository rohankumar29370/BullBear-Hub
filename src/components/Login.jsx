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
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const login = (event) => {
        event.preventDefault();
        const base_url = 'http://127.0.0.1:5000'
        const url = `${base_url}/user/authenticate-user/${username}/${password}`
        fetch(url).then(res=>{
            if(!res.ok){
                toast.error("Login failed. Invalid credentials.", { autoClose: false });
            }
            res.json().then(data=>{
                setUser((prevState)=>({
                    ...prevState,
                    user: data.username,
                    userId: data.id,
                    isLoggedIn: true
                }));
                navigate('/home');   //redirects to home page after login
            })
        }).catch((error) =>{
             toast.error(`Failed to authenticate user ${username}: ${error}`)
        });
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
