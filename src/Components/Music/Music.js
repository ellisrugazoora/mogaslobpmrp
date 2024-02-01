import React, { useEffect } from 'react';

function Music() {
  useEffect(() => {
    // Function to handle keydown events
    const handleKeydown = (event) => {
      console.log('Key pressed:', event.key);
    };

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeydown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []); // Empty dependency array means this effect will run once on mount

  return <div>Press a key and check the console.</div>;
}

export default Music;