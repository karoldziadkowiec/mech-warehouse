import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../../App.css';
import '../../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const moveToHomePage = () => {
    navigate('/home');
  };

  const moveToRegistrationPage = () => {
    navigate('/registration');
  };

  return (
    <div className="Login">
      <div className="login-container">
        <Form>
          <h2>Sign In</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="white-label">E-mail</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter e-mail" required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="white-label">Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter password" required />
          </Form.Group>
          <div className="d-grid">
            <Button variant="warning" type="submit" onClick={moveToHomePage}>Log In</Button>
            <p></p>
            <Button variant="secondary" onClick={moveToRegistrationPage}>Register account</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;