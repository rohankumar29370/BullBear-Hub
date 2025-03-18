import React from 'react';
import '../../styles/about.css'; 


const AboutUsCard = ({
    imageSrc,    // URL for the card image
    cardTitle,   // Title of the card
    cardText,    // Text body for the card
    buttonText,  // Text for the button
    buttonLink,  // URL for the button link
  }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
        <img
          className="card-img-top"
          src={imageSrc}
          alt="Card image cap"
        />
  
        <div className="card-body">
          <h5 className="card-title">{cardTitle}</h5>
          <p className="card-text">
            {cardText}
          </p>
          <a href={buttonLink} className="btn-primary">
            {buttonText}
          </a>
        </div>
      </div>
    );
  }

export default AboutUsCard;