import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import ApiURL from '../../constants/ApiConfig';
import '../../App.css';
import '../../styles/Registration.css';

interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    position: string;
    city: string;
    street: string;
}

const Registration = () => {
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${ApiURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate('/');
            } else {
                const errorResponse = await response.text(); // Zmiana: Odczytanie błędu jako tekstu
                console.error('Error during registration:', errorResponse);
                setError('Registration failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Registration failed. Please try again later.');
        }
    };

    const moveToLoginPage = () => {
        navigate('/');
    };

    return (
        <div className="Registration">
            <div className="registration-container">
                <Form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">First Name</Form.Label>
                            <Form.Control name="firstName" size="sm" type="text" placeholder="Enter first name" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Last Name</Form.Label>
                            <Form.Control name="lastName" size="sm" type="text" placeholder="Enter last name" onChange={handleChange} required />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label className="white-label">E-mail</Form.Label>
                        <Form.Control name="email" size="sm" type="email" placeholder="Enter e-mail" onChange={handleChange} required />
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Password</Form.Label>
                            <Form.Control name="password" size="sm" type="password" placeholder="Enter password" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Confirm Password</Form.Label>
                            <Form.Control name="confirmedPassword" size="sm" type="password" placeholder="Enter password again" required />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Phone Number</Form.Label>
                            <Form.Control name="phoneNumber" size="sm" type="tel" placeholder="Enter phone number" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Job Position</Form.Label>
                            <Form.Control name="position" size="sm" type="text" placeholder="Enter job position" onChange={handleChange} required />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">City</Form.Label>
                            <Form.Control name="city" size="sm" type="text" placeholder="Enter city" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label className="white-label">Street</Form.Label>
                            <Form.Control name="street" size="sm" type="text" placeholder="Enter street" onChange={handleChange} required />
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