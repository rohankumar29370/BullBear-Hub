import React from 'react';
import '../styles/about.css'; 


const AboutUsCard = (props) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
        
  
        <div className="card-body">
        <img
          className="card-img-top"
          src={props.imageSrc}
          alt={'Profile picture of ${props.cardTitle}'}
        />
          <h5 className="card-title">{props.cardTitle}</h5>
          <h6 className="card-designation">{props.cardDesignation}</h6>
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