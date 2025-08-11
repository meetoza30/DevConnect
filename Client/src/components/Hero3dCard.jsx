import React from "react";
import heroImg from '../assets/Hero3dImageFinal.png'; // path as per your project
import '../styles/Hero3dCard.css';

const Hero3dCard = () => (
  <div className="three-d-container noselect">
    <div className="canvas">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className={`tracker tr-${i + 1}`}></div>
      ))}
      <div id="three-d-card">
        <img src={heroImg} alt="Developers collaborating" className="three-d-image" />
        {/* <div className="three-d-title">look mom,<br />no JS</div> */}
        {/* <div className="three-d-subtitle">mouse hover tracker</div> */}
        <p className="three-d-prompt">HOVER OVER :D</p>
      </div>
    </div>
  </div>
);

export default Hero3dCard;
