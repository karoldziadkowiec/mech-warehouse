import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import '../../App.css';
import '../../styles/Registration.css';

const Registration = () => {
    const navigate = useNavigate();

    const moveToLoginPage = () => {
        navigate('/');
    };

    return (
        <div className="Registration">
            <div className="registration-container">
                <Form>
                    <h2>Sign Up</h2>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">First Name</Form.Label>
                            <Form.Control name="firstName" size="sm" type="text" placeholder="Enter first name" required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Last Name</Form.Label>
                            <Form.Control name="lastName" size="sm" type="text" placeholder="Enter last name" required />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label className="white-label">E-mail</Form.Label>
                        <Form.Control name="email" size="sm" type="email" placeholder="Enter e-mail" required />
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Password</Form.Label>
                            <Form.Control name="password" size="sm" type="password" placeholder="Enter password" required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Confirm Password</Form.Label>
                            <Form.Control name="confirmedPassword" size="sm" type="password" placeholder="Enter password again" required />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Phone Number</Form.Label>
                            <Form.Control name="phone" size="sm" type="tel" placeholder="Enter phone number" required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                        <Form.Label className="white-label">Job Position</Form.Label>
                        <Form.Select as={Col} size="sm" id="x"> 
                            <option>x</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">City</Form.Label>
                            <Form.Control name="city" size="sm" type="text" placeholder="Enter city" required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Street</Form.Label>
                            <Form.Control name="street" size="sm" type="text" placeholder="Enter street" required />
                        </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group className="mb-3">
                        <Button variant="warning" type="submit" className="register-button">Register</Button>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Button variant="danger" type="reset" className="form-button">Clear fields</Button>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Button variant="secondary" onClick={moveToLoginPage} className="form-button">Back</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default Registration;