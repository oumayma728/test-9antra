import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./cour.css";

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    priceType: "per week", 
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5001/api/courses/${editingId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5001/api/courses", formData);
      }
      fetchCourses();
      setForm({ title: "", price: "", priceType: "per week", image: null });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEdit = (course) => {
    setForm({
      title: course.title,
      price: course.price,
      priceType: course.priceType || "per week", 
      image: null,
    });
    setEditingId(course._id);
  };

  return (
    <div>
      <nav>
        <Link to="/admin">Dashboard</Link> |{" "}
        <Link to="/">Landing Page</Link> |{" "}
        <Link to="/admin/statPage">Statistics</Link>
      </nav>
      <h2>Welcome to Admin Panel</h2>
      <div className="admin-panel-content">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleInputChange}
              required
            />
            <select
              name="priceType"
              value={form.priceType}
              onChange={handleInputChange}
            >
              <option value="per week">Per Week</option>
              <option value="per month">Per Month</option>
              <option value="per year">Per Year</option>
            </select>
            <input type="file" name="image" onChange={handleImageChange} />
            <button type="submit">
              {editingId ? "Update Course" : "Add Course"}
            </button>
          </form>
        </div>

        <div className="course-list">
          {courses.map((course) => (
            <div key={course._id} className="course-item">
              <img
                src={`http://localhost:5001${course.image}`}
                alt={course.title}
                width="100"
              />
              <h4>{course.title}</h4>
              <p>
                {course.price} DT/{course.priceType || "N/A"}
              </p>
              <button className="edit" onClick={() => handleEdit(course)}>
                Edit
              </button>
              <button onClick={() => handleDelete(course._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
