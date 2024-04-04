import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthenticationApi from '../../services/api/AuthenticationApi';
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
    const { email, password } = loginData;
    const response = await AuthenticationApi.login(email, password);

    if (response.ok) {
      const responseData = await response.text();
      localStorage.setItem('token', responseData);
      localStorage.setItem('userEmail', email);
      navigate('/home');
    } else {
      setError('Invalid e-mail or password. Please try again.');
    }
  };

  const moveToRegistrationPage = () => {
    navigate('/registration');
  };

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