import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Corrected import for Link
import axios from "axios";
import "./stat.css";

const StatPage = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Generate random stat for students and visitors
  const randomStudents = Math.floor(Math.random() * 1000) + 100; // Random between 100-1100 students
  const randomVisitors = Math.floor(Math.random() * 5000) + 100; // Random between 100-5100 visitors

  return (
    <div>
      <nav>
        <Link to="/admin/coursePage">Courses</Link> |{" "}
        <Link to="/">Landing Page</Link> |{" "}
      </nav>
      <div className="stat-container">
        <h2>Stat Board</h2>
        <div className="stat-cards">
          <div className="card">
            <h3>Total Students</h3>
            <p>{randomStudents}</p>
          </div>
          <div className="card">
            <h3>Total Visitors</h3>
            <p>{randomVisitors}</p>
          </div>
          <div className="card">
            <h3>Total Courses</h3>
            <p>{courses.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatPage;
