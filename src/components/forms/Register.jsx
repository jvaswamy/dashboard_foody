import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { API_URL } from "../../data/apiPath";

const Register = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLowding] = useState(false);

  const { showFormHandler } = props;
  const toggleForm = () => {
    showFormHandler();
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setLowding(true);
      const url = `${API_URL}/vendor/register`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      };
      const response = await fetch(url, options);

      const data = await response.json();
      if (response.ok) {
        setUserName("");
        setPassword("");
        setEmail("");
        toggleForm();
        alert(`${data.message}`);
        setLowding(false);
      } else {
        alert(`${data.error}`);
        setLowding(false);
      }
    } catch (error) {
      alert("Registration Failed");
      setLowding(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitForm}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="reg-username">Username</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-email">Email</label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-password">Password</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // name="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {loading ? (
            <ClipLoader loading size={21} speedMultiplier={1} />
          ) : (
            "Register"
          )}
        </button>
      </form>
      <div className="toggle-link">
        Already have an account? <a onClick={toggleForm}>Login</a>
      </div>
    </div>
  );
};

export default Register;
