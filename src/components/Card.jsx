/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import toast from 'react-hot-toast';
import errorImage from '../assets/ads.jpg'

const Card = ({ item, onAddClick, onIncrement, onDecrement, quantity }) => {
    const [isAdding, setIsAdding] = useState(quantity === 0);

    if (!item) {
        return (
            <div className="rounded-2xl w-full max-w-[350px] mx-auto bg-slate-50 flex flex-col pb-4 animate-pulse">
                <div className="rounded-2xl w-full h-[200px] bg-gray-300 skeleton"></div>
                <div className="mt-3 max-w-[90%] mx-auto w-full">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 skeleton "></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        );
    }
    if (!item.image) {
        return null;
    }

    const handleAddClick = () => {
        setIsAdding(false);
        onAddClick();
    };

    const handleIncrement = () => {
        if (quantity < 50) {
            onIncrement();
        } else {
            toast.error("Admin bilan bog'laning");
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onDecrement();
        } else {
            setIsAdding(true);
            onDecrement();
        }
    };

    return (
        <div className="rounded-2xl w-full max-w-[350px] mx-auto bg-slate-50 flex flex-col pb-4 border">

            <div className="relative flex-none sm:w-60 md:h-42 h-40 sm:h-auto">
                <div className="absolute inset-0 bg-cover bg-center filter blur-sm before:absolute before:inset-0 before:bg-cover before:bg-center before:content-[''] before:filter before:blur-sm before:rounded-md before:z-[-1]" style={{ backgroundImage: `url(${`https://lotosapi.algorithmic.uz/api/Files?id=${item.image}`})` }}></div>
                <img 
                    src={`https://lotosapi.algorithmic.uz/api/Files?id=${item.image}`} 
                    alt={item.name} 
                    className='absolute inset-0 w-full h-full object-cover rounded-md mx-auto' 
                    loading="lazy" 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =errorImage; // Replace with a path to a default image
                    }}
                />
            </div>
            <div className="mt-3 max-w-[90%] mx-auto w-full">
                <h3 className="text-2xl font-semibold">{item.price.toLocaleString()} so'm</h3>
                <h4 className="text-xl">{item.name}</h4>
                <p className="text-gray-400 mt-3">{item.description}</p>
                {isAdding || quantity == 0 ? (
                    <button
                        onClick={handleAddClick}
                        className="mx-auto w-full py-3 bg-primary-50 text-white shadow-md rounded-xl max-w-sm mt-3 text-base"
                    >
                        + Добавить
                    </button>
                ) : (
                    <div className="flex items-center justify-between mx-auto w-full bg-gray-200 rounded-xl max-w-sm mt-3 text-base">
                        <button
                            onClick={handleDecrement}
                            className="px-5 py-3 bg-black text-white rounded-l-xl border-r-2 border-gray-300 flex items-center justify-center"
                        >
                            -
                        </button>
                        <span className="w-16 text-center py-2 text-xl">{quantity}</span>
                        <button
                            onClick={handleIncrement}
                            className="px-5 py-3 bg-primary-50 text-white rounded-r-xl border-l-2 border-gray-300 flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;