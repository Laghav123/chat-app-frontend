import React, { useEffect, useState } from 'react';
import './WelcomeMessage.css';

const WelcomeMessage = ({ userName }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div className="welcome-message">
        <p>Welcome to the anonymous room, {userName}!</p>
      </div>
    )
  );
};

export default WelcomeMessage;
