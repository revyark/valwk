import React, { useState, useEffect } from 'react';

export default function ThirdPg() {
  const [photoPosition, setPhotoPosition] = useState('center');
  const [displayedText, setDisplayedText] = useState('');
  const [showText, setShowText] = useState(false);

  const fullText = `Thank you so much for being in my life,shubho! I like how I can be a big crybaby around you and test your patience from time to time. HEHEHHRHEHHEHEHEUWEWROOEIIHEIHEF. Thank you so much for handling the mess of a person I am. You make everything right,even if practically things are going wrong. I am so so so grateful to have you. You are the exact prince charming of my dreams in my childhood. I can't imagine a life without you in it. And I can't imagine someone more caring,handsome,smarter,wilder,funnier than you in my wildest of dreams. I think it should be clear by now, that I love you soooo much. Please be my valentine.`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhotoPosition('left');
      setTimeout(() => {
        setShowText(true);
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showText) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [showText]);

  return (
    <div
      style={{
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: photoPosition === 'center' ? '50%' : '20%',
          top: '50%',
          transform: photoPosition === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
          transition: 'left 1s ease-in-out',
          zIndex: 2
        }}
      >
        <img
          src="/images/center_photo.png"
          alt="Valentine's"
          style={{
            width: '300px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(255,255,255,0.3)'
          }}
        />
      </div>

      {showText && (
        <div
          style={{
            position: 'absolute',
            right: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '400px',
            fontSize: '18px',
            lineHeight: '1.6',
            textAlign: 'left',
            zIndex: 1
          }}
        >
          {displayedText}
        </div>
      )}
    </div>
  );
}
