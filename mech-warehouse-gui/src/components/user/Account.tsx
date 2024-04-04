import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import '../../App.css';
import '../../styles/Account.css';
import { User } from '../../models/interfaces/User';
import UserApi from '../../services/api/UserApi';

const Account = () => {
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

    return (
        <div className="Account">
            <h1>My account</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {user && (
                <div>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>E-mail: {user.email}</p>
                    <p>Phone Number: {user.phoneNumber}</p>
                    <p>Position: {user.position.name}</p>
                    <p>Address: {user.address.city}, {user.address.street}</p>
                </div>
            )}
        </div>
    );
}

export default Account;