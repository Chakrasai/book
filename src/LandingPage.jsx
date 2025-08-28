import React from "react";

const LandingPage = ({ onStart }) => (
  <div className="landing-container">
    <h1>Welcome, Alex!</h1>
    <p className="intro">As a passionate college student, your love for books opens up worlds of adventure, knowledge, and inspiration. Start your journey to discover your next favorite book!</p>
    <button className="start-btn" onClick={onStart}>Start Exploring Books</button>
  </div>
);

export default LandingPage;
