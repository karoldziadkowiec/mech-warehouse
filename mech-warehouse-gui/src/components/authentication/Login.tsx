import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import ApiURL from '../../constants/ApiConfig';
import { User } from '../../models/interfaces/User';
import '../../App.css';
import '../../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const responseData = await response.text();
        localStorage.setItem('token', responseData);
        localStorage.setItem('userEmail', loginData.email);

        fetchUserData();

        navigate('/home');
      } else {
        setError('Invalid e-mail or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again later.');
    }
  };

  const moveToRegistrationPage = () => {
    navigate('/registration');
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');
      if (!token || !userEmail) {
        setError('Token or email not found.');
        return;
      }

      const response = await fetch(`${ApiURL}/user?email=${encodeURIComponent(userEmail)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData: User = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setError('Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="Login">
      <div className="login-container">
        <Form>
          <h2>Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="white-label">E-mail</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter e-mail" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="white-label">Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter password" onChange={handleChange} required />
          </Form.Group>
          <div className="d-grid">
            <Button variant="warning" type="button" onClick={handleLogin}>Log In</Button>
            <p></p>
            <Button variant="secondary" onClick={moveToRegistrationPage}>Register account</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;