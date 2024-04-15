import ApiURL from '../../constants/ApiConfig';
import { User } from '../../models/interfaces/User';

const UserApi = {
    async getUserData(): Promise<User> {
        try {
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('userEmail');
            if (!token || !userEmail) {
                throw new Error('Token or email not found.');
            }

            const response = await fetch(`${ApiURL}/user?email=${encodeURIComponent(userEmail)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data.');
            }

            const userData: User = await response.json();
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw new Error('An error occurred. Please try again later.');
        }
    },

    async deleteUser(): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('userEmail');
            if (!token || !userEmail) {
                throw new Error('Token or email not found.');
            }

            const response = await fetch(`${ApiURL}/users/${userEmail}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user.');
            }
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('An error occurred while deleting the user. Please try again later.');
        }
    },

    async editUser(user: User): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('userEmail');
            if (!token || !userEmail) {
                throw new Error('Token or email not found.');
            }

            const response = await fetch(`${ApiURL}/users/${userEmail}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Failed to update user.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('An error occurred while updating the user. Please try again later.');
        }
    }
};

export default UserApi;