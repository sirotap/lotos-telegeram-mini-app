// Home component
import { useState, useEffect } from 'react';
import Card from './Card';

const Home = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/MenuItems');
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    const handleAddClick = (itemId) => {
        setOrders({ ...orders, [itemId]: (orders[itemId] || 0) + 1 });
    };

    const handleIncrement = (itemId) => {
        setOrders({ ...orders, [itemId]: orders[itemId] + 1 });
    };

    const handleDecrement = (itemId) => {
        if (orders[itemId] > 1) {
            setOrders({ ...orders, [itemId]: orders[itemId] - 1 });
        } else {
            setOrders(({ [itemId]: _, ...rest }) => rest);
        }
    };

    return (
        <div className="bg-white">
            <label className="max-w-[350px] mb-4 mt-8 relative bg-white min-w-sm mx-auto flex flex-row items-center justify-center border py-1 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300" htmlFor="search-bar">
                <input id="search-bar" placeholder="Search" className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" />
                <button className="w-auto px-6 py-3 bg-primary-50 border-primary-50 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
                    <div className="relative">
                        <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                            <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <div className="flex items-center transition-all opacity-1 valid:">
                            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">Search</span>
                        </div>
                    </div>
                </button>
            </label>
            <div className="grid grid-cols-1 gap-4 px-5">
                {menuItems.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        onAddClick={() => handleAddClick(item.id)}
                        onIncrement={() => handleIncrement(item.id)}
                        onDecrement={() => handleDecrement(item.id)}
                        quantity={orders[item.id] || 0}
                    />
                ))}
            </div>
            <div>
                <h2>Orders</h2>
                {Object.entries(orders).map(([itemId, quantity]) => (
                    <div key={itemId}>
                        <p>
                            {menuItems.find((item) => item.id === parseInt(itemId)).name}: {quantity}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

// Card component
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
