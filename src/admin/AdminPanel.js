import React from "react";
import { Link } from "react-router-dom";
import "./cour.css";

const AdminPanel = () => {
  return (
    <div>
      <nav>
        <Link to="/admin/coursePage">Courses</Link> |{" "}
        <Link to="/admin/statPage">Statistics</Link>
        <Link to="/">Landing Page</Link> |{" "}
      </nav>
      <h2>Welcome to Admin Panel</h2>
    </div>
  );
};

export default AdminPanel;
