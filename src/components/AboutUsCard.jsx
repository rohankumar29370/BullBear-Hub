import React from 'react';
import '../styles/about.css'; 


const AboutUsCard = (props) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
        <img
          className="card-img-top"
          src={props.imageSrc}
          alt="Card image cap"
        />
  
        <div className="card-body">
          <h5 className="card-title">{props.cardTitle}</h5>
          <h7 className="card-designation">{props.cardDesignation}</h7>
          <p className="card-text">
            {props.cardText}
          </p>
          <a href={props.buttonLink} className="btn-primary-about">
            {props.buttonText}
          </a>
        </div>
      </div>
    );
  }

export default AboutUsCard;