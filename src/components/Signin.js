import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../layout/Signin.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  // Handle form submission for Sign In
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/login', {
        email,
        password,
      });

      console.log(response.data);
      localStorage.setItem('token', response.data.mytoken);
      alert('Signin successful!');
      
      navigate('/');  
    } catch (error) {
      console.error('Sign In error:', error.response ? error.response.data.message : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'Sign In failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}  

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
