import '../../styles/about.css';
import Author from '../author/Author.jsx';
import usrimg from '../../assets/defaultUserpic.jpg';


const About= ({setUserInParentComponent}) => {

    const handleLogout = (event) =>{
        event.preventDefault();
        setUserInParentComponent(prevState => ({
            ...prevState,
            isLoggedIn: false
        }));
    };

    return (<div>
        <h1>About us</h1>
        <Author userpic= {usrimg} bio = {'This is bio of author 1'}/>
        <Author userpic= {usrimg} bio = {'This is bio of author 2'}/>
        <Author userpic= {usrimg} bio = {'This is bio of author 3'}/>
        <button onClick={handleLogout}>Logout</button>
        </div>
    
    );

}

export default About;