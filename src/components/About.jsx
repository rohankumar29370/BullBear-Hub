import '../styles/about.css';
import AboutUsCard from './AboutUsCard.jsx';
import { useEffect } from 'react';
import contacts from '../assets/contacts.js';

const About = () => {
    useEffect(() => {
        const handleMouseMove = (event) => {
            const floatingShapes = document.querySelectorAll(".floating-shape");

            const { clientX: x, clientY: y } = event;

            floatingShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.02;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    function createCard(contact){
        return <AboutUsCard 
         key = {contact.id}
         imageSrc = {contact.imageSrc}
         cardTitle = {contact.cardTitle}
         cardText = {contact.cardText} 
         buttonText = {contact.buttonText} 
         buttonLink = {contact.buttonLink} />
    }

    return (
        <div className="about-us-body">
            {/* Floating Glassmorphic Shapes */}
            <div className="floating-shape"></div>
            <div className="floating-shape"></div>
            <div className="floating-shape"></div>

            <h1 className="about-us-title">About Us</h1>

            <div className="cards-container">
                {/* Map function to create cards for each contact */ }
                {contacts.map(createCard)} 
            </div>
        </div>
    );
}

export default About;
