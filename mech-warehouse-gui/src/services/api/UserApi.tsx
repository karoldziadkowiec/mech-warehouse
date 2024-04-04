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
    }
};

export default UserApi;