import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Alert, Form, Modal } from 'react-bootstrap';
import { User } from '../../models/interfaces/User';
import UserApi from '../../services/api/UserApi';
import '../../App.css';
import '../../styles/Account.css';

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserApi.getUserData();
                setUser(userData);
                setEditedUser(userData);
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

    const handleEditAccount = async () => {
        if (!editedUser) return;

        try {
            await UserApi.editUser(editedUser);
            setShowEditModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error editing user account:', error);
            setError('An error occurred while editing the account. Please try again later.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedUser) {
            setEditedUser(prevState => {
                if (prevState === null) {
                    return null;
                }
                return {
                    ...prevState,
                    [name]: value,
                    address: {
                        ...prevState.address,
                        [name.includes('address') ? name.split('.')[1] : '']: value
                    },
                    position: {
                        ...prevState.position,
                        [name.includes('position') ? name.split('.')[1] : '']: value
                    }
                };
            });
        }
    };

    const moveToLoginPage = () => {
        navigate('/');
    };

    return (
        <div className="Account">
            <h1>My account</h1>
            <div className="buttons-container">
                <Button variant="warning" className="form-button" onClick={() => setShowEditModal(true)}>Edit account</Button>
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
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label className="yellow-label">First Name</Form.Label>
                            <Form.Control name="firstName" size="sm" type="text" placeholder="Enter first name" maxLength={20} onChange={handleChange} required value={editedUser?.firstName || ''} />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label className="yellow-label">Last Name</Form.Label>
                            <Form.Control name="lastName" size="sm" type="text" placeholder="Enter last name" maxLength={30} onChange={handleChange} required value={editedUser?.lastName || ''} />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label className="yellow-label">Phone Number</Form.Label>
                            <Form.Control name="phoneNumber" size="sm" type="tel" placeholder="Enter phone number" maxLength={9} onChange={handleChange} required value={editedUser?.phoneNumber || ''} />
                        </Form.Group>
                        <Form.Group controlId="formJobPosition">
                            <Form.Label className="yellow-label">Job Position</Form.Label>
                            <Form.Control name="position.name" size="sm" type="text" placeholder="Enter job position" maxLength={20} onChange={handleChange} required value={editedUser?.position.name || ''} />
                        </Form.Group>
                        <Form.Group controlId="formCity">
                            <Form.Label className="yellow-label">City</Form.Label>
                            <Form.Control name="address.city" size="sm" type="text" placeholder="Enter city" maxLength={20} onChange={handleChange} required value={editedUser?.address.city || ''} />
                        </Form.Group>
                        <Form.Group controlId="formStreet">
                            <Form.Label className="yellow-label">Street</Form.Label>
                            <Form.Control name="address.street" size="sm" type="text" placeholder="Enter street" maxLength={30} onChange={handleChange} required value={editedUser?.address.street || ''} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="warning" onClick={handleEditAccount}>Save changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your account has been edited successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => setShowSuccessModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Account;