import { useState } from 'react';
import { CiShoppingBasket, CiRead } from "react-icons/ci";
import useMenuItems from '../hooks/useMenuItems';
import useOrders from '../hooks/useOrders';
import Card from './Card';
import Drawer from './Drawer';
import CardOrder from './CardOrder';
import SearchBar from './/SearchBar';
import OrderConfirmationModal from './OrderConfirmationModal';

const Home = () => {
    const { menuItems, isLoading, error } = useMenuItems();
    const [orderComment, setOrderComment] = useState('');
    const {
        orders,
        addToOrder,
        incrementOrder,
        decrementOrder,
        updateOrder,
        confirmOrder,
        totalOrderCount,
        calculateTotalPrice
    } = useOrders();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const filteredMenuItems = menuItems.filter(item =>
        item && item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleCommentChange = (e) => {
        setOrderComment(e.target.value);
    };

    const handleConfirmOrder = async () => {
        const success = await confirmOrder(orderComment);
        if (success) {
            setIsDrawerOpen(false);
            setIsModalOpen(false);
            setOrderComment(''); // Clear comment after successful order
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
console.log(menuItems)
    return (
        <div className="bg-white min-h-[70svh] h-full">
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

            <div className="grid grid-cols-1 gap-4 px-5 pt-5 pb-20">
                {filteredMenuItems.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        onAddClick={() => addToOrder(item.id)}
                        onIncrement={() => incrementOrder(item.id)}
                        onDecrement={() => decrementOrder(item.id)}
                        quantity={orders[item.id] || 0}
                    />
                ))}
            </div>

            {totalOrderCount > 0 && (
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="fixed uppercase gap-x-2 bottom-0 w-full bg-primary-50 px-4 py-4 shadow-lg flex items-center text-white text-center justify-center"
                >
                    <CiRead className='text-2xl' /> Перейти к заказу({totalOrderCount})
                </button>
            )}

            <OrderConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmOrder}
                totalPrice={calculateTotalPrice(menuItems)}
            />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <div className='flex items-center bg-primary-50 text-white px-3 justify-between py-3'>
                    <h2 className="text-2xl font-bold">Заказы</h2>
                    <button onClick={() => setIsDrawerOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {totalOrderCount > 0 ? (
                    <>
                        <div className='px-5'>
                            {menuItems.map((item) => (
                                orders[item.id] ? (
                                    <CardOrder
                                        key={item.id}
                                        item={item}
                                        quantity={orders[item.id]}
                                        onUpdateOrder={updateOrder}
                                    />
                                ) : null
                            ))}
                        </div>
                        <div className="px-4 py-2">
                            <textarea
                                placeholder="Комментарий к заказу..."
                                value={orderComment}
                                onChange={handleCommentChange}
                                className="w-full py-2 px-3 text-gray-700 bg-white border rounded-md focus:border-primary-50 focus:outline-none focus:ring focus:ring-primary-50 focus:ring-opacity-40"
                                rows="3"
                            />
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="mt-2 w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                            >
                                Вы ничего не забыли?
                            </button>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="fixed bottom-0 w-full bg-primary-50 text-white px-4 py-4 shadow-lg flex items-center justify-between uppercase"
                        >
                            <div className="flex items-center uppercase">
                                <CiShoppingBasket className='text-2xl mr-2' />
                                <span>Подтвердить</span>
                            </div>
                            <span className="font-bold">{calculateTotalPrice(menuItems).toLocaleString()} сум</span>
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <CiShoppingBasket className="text-7xl text-gray-300 mb-6" />
                        <p className="text-2xl font-semibold text-gray-600 mb-4">Ваша корзина пуста</p>
                        <p className="text-gray-500 mb-8 max-w-md">
                            В вашей корзине пока ничего нет. Просмотрите товары и добавьте то, что вам понравится!
                        </p>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="bg-primary-50 hover:bg-primary-60 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Просмотреть товары</span>
                        </button>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default Home;