import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { RegistrationData } from '../../models/dtos/RegistrationData';
import { registerUser } from '../../services/api/RegistrationApi';
import '../../App.css';
import '../../styles/Registration.css';

const Registration = () => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmedPassword: '',
        phoneNumber: '',
        position: '',
        city: '',
        street: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegistrationData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isNaN(Number(registrationData.phoneNumber))) {
            setError('Phone number must be a number.');
            return;
        }

        if (registrationData.phoneNumber.length !== 9) {
            setError('Phone number must contain exactly 9 digits.');
            return;
        }
    
        if (registrationData.password !== registrationData.confirmedPassword) {
            setError('Passwords do not match.');
            return;
        }

        const response = await registerUser(registrationData);
    
        if (response.success) {
            const { token } = response.data;
            localStorage.setItem('token', token);
            moveToLoginPage();
        } else {
            setError(response.error);
        }
    };

    const moveToLoginPage = () => {
        navigate('/');
    };

    return (
        <div className="Registration">
            <div className="registration-container">
                <Form onSubmit={handleRegister}>
                    <h2>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">First Name</Form.Label>
                            <Form.Control name="firstName" size="sm" type="text" placeholder="Enter first name" maxLength={20} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Last Name</Form.Label>
                            <Form.Control name="lastName" size="sm" type="text" placeholder="Enter last name" maxLength={30} onChange={handleChange} required />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label className="white-label">E-mail</Form.Label>
                        <Form.Control name="email" size="sm" type="email" placeholder="Enter e-mail" maxLength={40} onChange={handleChange} required />
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Password</Form.Label>
                            <Form.Control name="password" size="sm" type="password" placeholder="Enter password" maxLength={20} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Confirm Password</Form.Label>
                            <Form.Control name="confirmedPassword" size="sm" type="password" placeholder="Enter password again" maxLength={20} onChange={handleChange} required />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Phone Number</Form.Label>
                            <Form.Control name="phoneNumber" size="sm" type="tel" placeholder="Enter phone number" maxLength={9} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Job Position</Form.Label>
                            <Form.Control name="position" size="sm" type="text" placeholder="Enter job position" maxLength={20} onChange={handleChange} required />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">City</Form.Label>
                            <Form.Control name="city" size="sm" type="text" placeholder="Enter city" maxLength={20} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Street</Form.Label>
                            <Form.Control name="street" size="sm" type="text" placeholder="Enter street" maxLength={30} onChange={handleChange} required />
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