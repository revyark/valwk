import './Hero.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/second');
    }
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="glow-left"></div>
        <div className="glow-right"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
              <h1 className="hero-title">Hey there — I got something for you!</h1>
        </div>
        <div className="hero-image-wrapper">
          <img 
                src={process.env.PUBLIC_URL + '/images/image_2.png'}
            alt="Valentine's Hero" 
            className="hero-image"
          />
          <div className="image-glow"></div>
        </div>

          <div className="hero-cta">
            <button className="cta-btn primary" onClick={handleClick}>Let's go!</button>
            <button className="cta-btn secondary" onClick={() => alert('No thanks')}>No thanks</button>
          </div>
      </div>

      <div className="hero-decor hero-decor-1"></div>
      <div className="hero-decor hero-decor-2"></div>
    </section>
  );
}

export default Hero;
