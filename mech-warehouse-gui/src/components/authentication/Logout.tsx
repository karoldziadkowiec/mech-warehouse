import React from 'react';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/';
    };

    return (
        <NavDropdown.Item as={NavLink} to="/logout" onClick={handleLogout}>
            Log out
        </NavDropdown.Item>
    );
}

export default Logout;