import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { API_URL } from "../../data/apiPath";
import "./Form.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLowding] = useState(false);
  const navigate = useNavigate();
  const { showFormHandler, history } = props;

  const handlingSubmit = async (event) => {
    event.preventDefault();
    setLowding(true);
    try {
      const url = `${API_URL}/vendor/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token);

        navigate("/home", { replace: true });
        localStorage.setItem("vendorId", data.vendorId);
        localStorage.setItem("firmName", data.firmName);
        alert(`${data.success}`);
      } else {
        alert(`${data.error_msg}`);
        setLowding(false);
      }
    } catch (error) {
      alert(`${error}`);
      setLowding(false);
    }
  };

  const toggleForm = () => {
    showFormHandler();
  };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handlingSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {loading ? (
            <ClipLoader loading size={21} speedMultiplier={1} />
          ) : (
            "Login"
          )}
        </button>
        <div className="toggle-link">
          Don't have an account? <a onClick={toggleForm}>Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
