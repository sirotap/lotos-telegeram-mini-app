import { useState } from 'react';
import { ApiService } from '../api/api';
import toast from 'react-hot-toast';

const useOrders = () => {
    const [orders, setOrders] = useState({});

    const addToOrder = (itemId) => {
        setOrders(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const incrementOrder = (itemId) => {
        setOrders(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };
    const decrementOrder = (itemId) => {
        setOrders(prev => {
            const newQuantity = prev[itemId] - 1;
            if (newQuantity > 0) {
                return { ...prev, [itemId]: newQuantity };
            } else {
                const newOrders = { ...prev };
                delete newOrders[itemId];
                return newOrders;
            }
        });
    };

    const updateOrder = (itemId, newQuantity) => {
        setOrders(prev => ({ ...prev, [itemId]: newQuantity }));
    };

    const confirmOrder = async (comment) => {
        const orderData = {
            orderId: Math.floor(10000 + Math.random() * 90000), // 5-digit random number
            storeItems: Object.entries(orders).map(([menuItemId, quantity]) => ({
                menuItemId: parseInt(menuItemId),
                quantity
            })),
            comment: comment || "No comment" // Use the provided comment or a default value
        };

        try {
            await ApiService.sendOrder(orderData);
            toast.success("Buyurtma muvaffaqiyatli yuborildi!");
            setOrders({});
            return true;
        } catch (error) {
            toast.error("Buyurtma yuborishda xatolik yuz berdi.");
            return false;
        }
    };

    const totalOrderCount = Object.values(orders).reduce((sum, quantity) => sum + quantity, 0);

    const calculateTotalPrice = (menuItems) => {
        return menuItems.reduce((total, item) => {
            if (item && item.id && item.price) {
                const quantity = orders[item.id] || 0;
                return total + (item.price * quantity);
            }
            return total;
        }, 0);
    };
    return {
        orders,
        addToOrder,
        incrementOrder,
        decrementOrder,
        updateOrder,
        confirmOrder,
        totalOrderCount,
        calculateTotalPrice
    };
};

export default useOrders;