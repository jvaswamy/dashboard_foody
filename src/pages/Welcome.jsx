import React from "react";
import { assets } from "../../public/assets/assets";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <img src={assets.chef} alt="Welcome" className="welcome-image" />
      <h1>Welcome to Our Website</h1>
      <p>Your journey to explore begins here.</p>
    </div>
  );
};

export default Welcome;
