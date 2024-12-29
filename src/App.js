import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Card from "./components/Card";
import Contact from "./components/contact";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import AdminPanel from "./admin/AdminPanel";
import StatPage from "./admin/statPage";
import CoursePage from "./admin/coursePage";  // Capitalized the component name
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route
          path="/"
          element={
            <div className="App">
              <Navbar />
              <Register />
              <Card />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/admin/statPage" element={<StatPage />} />
        <Route path="/admin/coursePage" element={<CoursePage />} />  {/* Updated route with capitalized component */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
