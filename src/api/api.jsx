// api.js
const BASE_URL = 'https://lotosapi.algorithmic.uz/api';

export const ApiService = {
    async fetchMenuItems() {
        try {
            const response = await fetch(`${BASE_URL}/MenuItems/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    },

    sendOrder: async (orderData) => {
        try {
            const response = await fetch(`${BASE_URL}/Orders/NewOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();

            // Check if the response is empty
            if (!text) {
                return null; // or return a default value
            }

            // Try to parse the JSON, but handle potential errors
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error('Error parsing JSON:', text);
                throw new Error('Invalid JSON response from server');
            }
        } catch (error) {
            console.error('Error sending order:', error);
            throw error;
        }
    },

    async getOrderIngredients(orderId) {
        if (!orderId) {
            throw new Error('Order ID is undefined');
        }
        try {
            const response = await fetch(`${BASE_URL}/Orders/GetIngredients?id=${orderId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return null; // Ma'lumot topilmadi
                }
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching order ingredients:', error);
            throw error;
        }
    }
};