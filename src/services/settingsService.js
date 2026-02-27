import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users/me'; // Using port 5001 as per verification

// Helper to get token
const getAuthFixedHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'x-auth-token': token
        }
    };
};

export const getSettings = async () => {
    try {
        const response = await axios.get(`${API_URL}/settings`, getAuthFixedHeader());
        return response.data;
    } catch (error) {
        console.error('Error fetching settings:', error);
        throw error;
    }
};

export const updateSettings = async (settingsData) => {
    try {
        const response = await axios.patch(`${API_URL}/settings`, settingsData, getAuthFixedHeader());
        return response.data;
    } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
    }
};

export const getNotifications = async () => {
    try {
        const response = await axios.get(`${API_URL}/notifications`, getAuthFixedHeader());
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};
