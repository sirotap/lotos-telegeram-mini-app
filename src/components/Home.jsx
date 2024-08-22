/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Card from './Card';
import Drawer from './Drawer';
import { CiShoppingBasket, CiRead } from "react-icons/ci";
import CardOrder from './CardOrder';
import toast from 'react-hot-toast';

const Home = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleViewOrders = () => {
        setIsOpen(true);
    };

    const handleUpdateOrder = (itemId, newQuantity) => {
        setOrders({ ...orders, [itemId]: newQuantity });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const totalOrderCount = Object.values(orders).reduce((sum, quantity) => sum + quantity, 0);

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const calculateTotalPrice = () => {
        return menuItems.reduce((total, item) => {
            const quantity = orders[item.id] || 0;
            return total + (item.price * quantity);
        }, 0);
    };
    const handleConfirmOrder = () => {
        setIsModalOpen(true);
    };
    const confirmOrder = async () => {
        const orderData = {
            orderId: Math.floor(Math.random() * 100000),
            comment: "izoh",
            storeItems: Object.entries(orders).map(([menuItemId, quantity]) => ({
                menuItemId: parseInt(menuItemId),
                quantity
            }))
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/Orders/NewOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
    
            if (response.ok) {
                toast.success("Buyurtma muvaffaqiyatli yuborildi!");
                setOrders({});
                setIsOpen(false);
            } else {
                toast.error("Buyurtma yuborishda xatolik yuz berdi.");
            }
        } catch (error) {
            console.error('Error sending order:', error);
            toast.error("Buyurtma yuborishda xatolik yuz berdi.");
        }
        setIsModalOpen(false);
    };
    return (
        <div className="bg-white min-h-[70svh] h-full">
            <label className="max-w-[350px] mb-4 mt-8 relative bg-white min-w-sm mx-auto flex flex-row items-center justify-center border py-1 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300" htmlFor="search-bar">
                <input
                    id="search-bar"
                    placeholder="Search"
                    className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
            <div className="grid grid-cols-1 gap-4 px-5 py-10">
                {filteredMenuItems.map((item) => (
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
            {totalOrderCount > 0 && (
                <button
                    onClick={handleViewOrders}
                    className="fixed uppercase gap-x-2 bottom-0 w-full bg-primary-50 text-blacck px-4 py-4 shadow-lg flex items-center text-white text-center justify-center"
                >
                    <CiRead className='text-2xl' /> Buyurtmaga o&apos;tish({totalOrderCount})
                </button>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Buyurtmani tasdiqlash</h3>
                        <p className="mb-6">Buyurtmani tasdiqlaysizmi?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Bekor qilish
                            </button>
                            <button
                                className="px-4 py-2 bg-primary-50 text-white rounded hover:bg-primary-60"
                                onClick={confirmOrder}
                            >
                                Tasdiqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className='flex items-center bg-primary-50 text-white px-3 justify-between py-3'>
                    <h2 className="text-2xl font-bold ">Buyurtmalar</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {menuItems.map((item) => (
                    <CardOrder
                        key={item.id}
                        item={item}
                        quantity={orders[item.id] || 0}
                        onUpdateOrder={handleUpdateOrder}
                    />
                ))}
                {totalOrderCount > 0 && (
                    <button
                        onClick={handleConfirmOrder}
                        className="fixed bottom-0 w-full bg-primary-50 text-white px-4 py-4 shadow-lg flex items-center justify-between uppercase"
                    >
                        <div className="flex items-center uppercase">
                            <CiShoppingBasket className='text-2xl mr-2' />
                            <span>Tasdiqlash</span>
                        </div>
                        <span className="font-bold">{calculateTotalPrice().toLocaleString()} so&apos;m</span>
                    </button>
                )}
            </Drawer>
        </div>
    );
};

export default Home;