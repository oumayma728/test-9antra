import React from "react";
import { Link } from "react-router-dom";
import "../layout/Register.css"; 
import MainImage from "../img/main.jpg";

const Register = () => {
  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${MainImage})` }} 
    >
      <div className="hero-content">
        <h2 className="hero-title">
          Improve your skills on your own
          <br />
          To prepare for a better future
        </h2>
        <Link to="/signup">
          <button className="button1">REGISTER NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
