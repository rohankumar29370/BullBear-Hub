import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/login.css';


const Login = ({setUserInParentComponent}) =>{

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const login = (event)  =>{
    event.preventDefault();
    if (username === "admin" && password === "admin"){
        setUserInParentComponent(prevState => ({
            ...prevState,
            user: username,
            isLoggedIn: true
        }));
    }else{
        toast.error("Login failed", {autoClose: false});

    }

    // console.log(username); checking if states are updated correctly.
    // console.log(password);
}

    return(
    <div className= "signin-body">
        <div className="signin-container">
            <h1>Sign in</h1>
            <form onSubmit={login}>
                <label>Username</label>
                <input type="text" id="Email" name="Email" onChange={(event)=> setUsername(event.target.value)}/>
                <label>Password</label>
                <input type="password" id="Password" name="Password"  onChange={(event)=> setPassword(event.target.value)}/>
                <input type="submit" value="Sign in" />
            </form>
        </div>
        <ToastContainer />
        </div>
    );
}

export default Login;
