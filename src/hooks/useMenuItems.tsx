import { useState, useEffect } from 'react';
import { ApiService } from '../api/api';

const useMenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                setIsLoading(true);
                const data = await ApiService.fetchMenuItems();
                setMenuItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenuItems();
    }, []);

    return { menuItems, isLoading, error };
};

export default useMenuItems;