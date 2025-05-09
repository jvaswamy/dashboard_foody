import React, { useState } from "react";
import Register from "../components/forms/Register";
import Login from "../components/forms/Login";
import "./Pages.css";

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm((preValue) => !preValue);
  };

  return (
    <div className="landing-container">
      {showForm ? (
        <Register showFormHandler={showFormHandler} />
      ) : (
        <Login showFormHandler={showFormHandler} />
      )}
    </div>
  );
};

export default LandingPage;
