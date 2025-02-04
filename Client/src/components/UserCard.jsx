import React from 'react';
import '../styles/UserCard.css'

const UserCard = () => {
  return (
    <div className="parent">
      <div className="card">
        <div className="logo">
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">
            <div className="usercicle">
              <img 
                src="https://media.wired.com/photos/5c83219a692d1216df5ce666/1:1/w_1125,h_1125,c_limit/Transpo-Elon-Musk-RTX6P9YW.jpg" 
                className="userimg"
                alt="User profile"
              />
            </div>
          </span>
        </div>
        
        <div className="glass"></div>
        
        <div className="content">
          <span className="title">ABCDEFGHIJK</span>
          <span className="text">Skills : Javasript | Python | Artficial Intelligence</span>
        </div>
        
        <div className="bottom">
          <div className="social-buttons-container">
            <button className="social-button wrong-answer">
              <svg viewBox="0 0 24 24" width="24" height="24" className="svg">
                <path 
                  d="M6 18L18 6M6 6l12 12" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="social-button right-answer">
              <svg viewBox="0 0 24 24" width="24" height="24" className="svg">
                <path 
                  d="M20 6L9 17l-5-5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                />
              </svg>
            </button>
          </div>
          
          <div className="view-more">
            <button className="view-more-button">Profile</button>
            <svg 
              className="svg" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;