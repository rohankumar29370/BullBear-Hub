import '../styles/about.css';
import usrimg from '../assets/defaultUserpic.jpg';
import AboutUsCard from './AboutUsCard.jsx';
import { useEffect } from 'react';

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

    return (
        <div className="about-us-body">
            {/* Floating Glassmorphic Shapes */}
            <div className="floating-shape"></div>
            <div className="floating-shape"></div>
            <div className="floating-shape"></div>

            <h1 className="about-us-title">About Us</h1>

            <div className="cards-container">
                <AboutUsCard imageSrc={usrimg} cardTitle="Tuan Vo" cardText="Lead Developer with expertise in AI and blockchain technology." buttonText="Learn More" buttonLink="https://www.linkedin.com" />
                <AboutUsCard imageSrc={usrimg} cardTitle="Fnu Rohan" cardText="Financial Analyst with a strong background in crypto markets." buttonText="Learn More" buttonLink="https://www.linkedin.com" />
                <AboutUsCard imageSrc={usrimg} cardTitle="Taraq Pradhumna Kosaraju" cardText="Blockchain Engineer with years of experience in DeFi applications." buttonText="Learn More" buttonLink="https://www.linkedin.com" />
                <AboutUsCard imageSrc={usrimg} cardTitle="Jovita Perpetual Mendonca" cardText="Innovative strategist with expertise in financial modeling and risk assessment." buttonText="Learn More" buttonLink="https://www.linkedin.com" />
            </div>
        </div>
    );
}

export default About;
