import '../../styles/author.css';



const Author= (props) => {

    return (
    <div className= "author-container">
    <img className = "author-img" src= {props.userpic} />
    <p className = "user-bio"> {props.bio}</p>
    </div>

);

}

export default Author;