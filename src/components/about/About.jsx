import '../../styles/about.css';
import Author from '../author/Author.jsx';
import usrimg from '../../assets/defaultUserpic.jpg';
import AboutUsCard from '../about/AboutUsCard.jsx';

const About= ({setUserInParentComponent}) => {

    const handleLogout = (event) =>{
        event.preventDefault();
        setUserInParentComponent(prevState => ({
            ...prevState,
            isLoggedIn: false
        }));
    };

    return (<div>        <h1 className='about-us-title'>About us</h1>

        <div className="cards-container">

            <AboutUsCard
                    imageSrc={usrimg}
                    cardTitle="Tuan Vo"
                    cardText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    buttonText="Learn more"
                    buttonLink="https://www.linkedin.com"
                />
            <AboutUsCard
                    imageSrc={usrimg}
                    cardTitle="Fnu Rohan"
                    cardText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    buttonText="Learn more"
                    buttonLink="https://www.linkedin.com"
                />
            <AboutUsCard
                    imageSrc={usrimg}
                    cardTitle="Taraq Pradhumna Kosaraju "
                    cardText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    buttonText="Learn more"
                    buttonLink="https://www.linkedin.com"
                />
            <AboutUsCard
                    imageSrc={usrimg}
                    cardTitle="Jovita Perpetual Mendonca"
                    cardText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    buttonText="Learn more"
                    buttonLink="https://www.linkedin.com"
                />
            </div>

        </div>
    
    );

}

export default About;