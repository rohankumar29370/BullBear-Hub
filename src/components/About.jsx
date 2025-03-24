import '../styles/about.css';
import AboutUsCard from './AboutUsCard.jsx';
import contacts from '../assets/contacts.js';

const About = () => {
    function createCard(contact){
        return <AboutUsCard 
         key = {contact.id}
         imageSrc = {contact.imageSrc}
         cardTitle = {contact.cardTitle}
         cardDesignation = {contact.cardDesignation}
         cardText = {contact.cardText} 
         buttonText = {contact.buttonText} 
         buttonLink = {contact.buttonLink} />
    }

    return (
        <div className="about-us-body">
            <h1 className="about-us-title">About Us</h1>
            <div className="feature-divider"></div>
            <p className="about-us-subtitle">
                At BullBear Hub, we empower investors with smart tools to build and manage successful investment portfolios. Our platform combines data-driven insights with intuitive features, helping users make informed decisions in dynamic financial markets. Whether you're a seasoned investor or just starting out, BullBear Hub is your trusted partner for achieving financial growth.
                <br/><br/>
                Behind our platform is a dedicated team of experts committed to guiding you on your investment journey. Meet the team driving innovation and helping you succeed.
            </p>
            <h2 className="section-title">Who We Are</h2>

            <div className="cards-container">
                {/* Map function to create cards for each contact */ }
                {contacts.map(createCard)} 
            </div>
        </div>
    );
}

export default About;
