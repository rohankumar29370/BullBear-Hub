import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';

const Login = ({ setUserInParentComponent }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            {/* Video Background */}
            <video autoPlay muted loop className="background-video">
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="signin-container">
                <h1>Sign In</h1>
                <form onSubmit={login}>
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <input type="submit" value="Sign In" />
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
