import React from "react";
import "../layout/Navbar.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa"; // Import the icon from react-icons

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
    <ul className="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#CardSection">Features</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <Link to="/admin" className="admin-link">
      <FaUserShield style={{ marginRight: "8px" }} /> Admin
    </Link>
  </nav>
);

export default Navbar;
