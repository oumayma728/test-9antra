import React, { useState, useEffect } from "react";
import axios from "axios";
import "../layout/card.css";

const CardSection = () => {
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

  return (
    <section id="cards" className="card-section">
      <div className="card-text">
        <h3>Discover Our Courses</h3>
        <button className="button2">View More</button>
      </div>

      <div className="card-grid">
        {courses.map((course) => (
          <div key={course._id} className="card">
            <div className="course-image">
              <img
                src={`http://localhost:5001${course.image}`}
                alt={course.title}
                width="200"
              />
            </div>
            <div className="course-info">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <p>
                {course.price} DT/{course.period || 'Month'} 
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardSection;
