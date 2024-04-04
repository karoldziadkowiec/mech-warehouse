import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Alert, Form } from 'react-bootstrap';
import '../../App.css';
import '../../styles/Account.css';
import { User } from '../../models/interfaces/User';
import UserApi from '../../services/api/UserApi';

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserApi.getUserData();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('An error occurred. Please try again later.');
            }
        };
        fetchUserData();
    }, []);

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account?');
        if (!confirmDelete) return;

        try {
            await UserApi.deleteUser();
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            moveToLoginPage();
            setError('Account deleted successfully');
        } catch (error) {
            console.error('Error deleting user account:', error);
            setError('An error occurred while deleting the account. Please try again later.');
        }
    };

    const moveToLoginPage = () => {
        navigate('/');
    };
    return (
        <div className="Account">
            <h1>My account</h1>
            <div className="buttons-container">
                <Button variant="warning" className="form-button">Edit account</Button>
                <Button variant="danger" className="form-button" onClick={handleDeleteAccount}>Delete account</Button>
            </div>
            <div className="user-data-container">
                {error && <Alert variant="danger">{error}</Alert>}
                {user && (
                    <div>
                        <p><Form.Label className="white-label">First name: </Form.Label>
                            <Form.Label className="yellow-label"> {user.firstName}</Form.Label></p>
                        <p><Form.Label className="white-label">Last name: </Form.Label>
                            <Form.Label className="yellow-label"> {user.lastName}</Form.Label></p>
                        <p><Form.Label className="white-label">E-mail: </Form.Label>
                            <Form.Label className="yellow-label"> {user.email}</Form.Label></p>
                        <p><Form.Label className="white-label">Phone number: </Form.Label>
                            <Form.Label className="yellow-label"> {user.phoneNumber}</Form.Label></p>
                        <p><Form.Label className="white-label">Position: </Form.Label>
                            <Form.Label className="yellow-label"> {user.position.name}</Form.Label></p>
                        <p><Form.Label className="white-label">Address: </Form.Label>
                            <Form.Label className="yellow-label"> {user.address.city}, {user.address.street}</Form.Label></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Account;