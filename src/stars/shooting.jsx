import React from "react";
import "./stars.scss";

const ShootingStars = () => {
  const starCount = 50;

  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= starCount; i++) {
      const starTailLength = `${randomRange(500, 750) / 100}em`;
      const topOffset = `${randomRange(0, 10000) / 100}vh`;
      const fallDuration = `${randomRange(6000, 12000) / 1000}s`;
      const fallDelay = `${randomRange(0, 10000) / 1000}s`;

      const starStyle = {
        "--star-tail-length": starTailLength,
        "--top-offset": topOffset,
        "--fall-duration": fallDuration,
        "--fall-delay": fallDelay,
      };

      stars.push(
        <div className="star" style={starStyle} key={i}>
          <span></span>
          <span></span>
        </div>
      );
    }
    return stars;
  };

  const randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return <div className="stars">{generateStars()}</div>;
};

export default ShootingStars;
