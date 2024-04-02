import ApiURL from '../../constants/ApiConfig';
import { RegistrationData } from '../../models/dtos/RegistrationData';

export async function registerUser(registrationData: RegistrationData) {
    try {
        const response = await fetch(`${ApiURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        if (response.ok) {
            const responseData = await response.json();
            return { success: true, data: responseData };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.message };
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, error: 'Registration failed. Please try again later.' };
    }
}