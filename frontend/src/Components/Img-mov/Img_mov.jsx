import React, { useState, useEffect } from "react";
import "./img_mov.css";

const Img_mov = () => {
  const images = [
    "src/assets/Banner01.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // change every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider">
      <img
        className="img_gov"
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
      />
    </div>
  );
};

export default Img_mov;
