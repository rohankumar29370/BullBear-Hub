import rohanImg from './Rohan.jpeg';
import jovitaImg from './Jovita.jpeg';
import tkImg from './TK.jpeg';
import TuanImg from './Tuan.jpeg';

const contacts = [
    {
        id : 1,
        imageSrc: TuanImg,
        cardTitle : "Tuan Vo", 
        cardDesignation : "🧑‍💻 Financial Data & Backend Engineer",
        cardText : "Blends logic and finance to build the brains behind the app — crafting data pipelines and backend systems that turn numbers into portfolio insight.",
        buttonText : "Learn More",
        buttonLink: "https://www.linkedin.com/in/tuan-vo-575140221/"
    }, 
    {
        id :2,
        imageSrc: rohanImg,
        cardTitle:"Rohan Kumar", 
        cardDesignation : "💼 Co-founder & Financial Analyst",
        cardText : "Bridges market thinking with product flow — shaping return models, investment logic, and insights that give real meaning to every portfolio decision." ,
        buttonText :"Learn More",
        buttonLink : "https://www.linkedin.com/in/rohaniba/",
    },
    {
        id :3,
        imageSrc: tkImg,
        cardTitle : "Taraq Pradhumna Kosaraju", 
        cardDesignation : "👨‍💻 Full Stack Developer",
        cardText : "Connects the dots from front to back — building seamless features, clean architecture, and smart interactions that shape the portfolio experience.",
        buttonText : "Learn More",
        buttonLink : "https://www.linkedin.com/in/taraq-pradhumna-kosaraju-03/"
    },
    {
        id :4,
        imageSrc: jovitaImg,
        cardTitle : "Jovita Perpetual Mendonca", 
        cardDesignation : "🧑‍🎨 UI/UX Designer",
        cardText : "Shapes the story users see and feel — turning complex financial data into elegant, intuitive interfaces that make managing portfolios a breeze.",
        buttonText : "Learn More",
        buttonLink : "https://www.linkedin.com/in/jovita-mendonca-994922288/"
    }
];

export default contacts;