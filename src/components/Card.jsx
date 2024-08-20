/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import  { useState } from 'react';
import toast from 'react-hot-toast';

const Card = ({ item, onAddClick }) => {
    const [count, setCount] = useState(0);
    const [isAdding, setIsAdding] = useState(true);

    const handleAddClick = () => {
        setIsAdding(false);
        setCount(1); // Initialize count to 1 when "Add" is clicked
    };

    const handleIncrement = () => {
        if (count < 50) {
            setCount(count + 1);
        } else {
            toast.error("Admin bilan bog'laning")
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        } else {
            setCount(0);
            setIsAdding(true); // Revert to "Add" button when count reaches 0
        }
    };

    return (
        <div className="rounded-2xl w-full max-w-[350px] mx-auto bg-slate-50 flex flex-col pb-3">
            <img
                src={`http://localhost:5000/api/Files?id=${item.image}`} // Adjust the image path accordingly
                alt={item.name}
                className="rounded-2xl w-full h-auto max-h-[200px]"
            />
            <div className="mt-3 max-w-[90%] mx-auto w-full">
                <h3 className="text-2xl font-semibold">{item.price.toLocaleString()} so'm</h3>
                <h4 className="text-xl">{item.name}</h4>
                <p className="text-gray-400 mt-3">{item.description}</p>
                {isAdding ? (
                    <button
                        onClick={handleAddClick}
                        className="mx-auto w-full py-3 bg-primary-50 text-white shadow-md rounded-xl max-w-sm mt-3 text-base"
                    >
                        + Qo'shish
                    </button>
                ) : (
                    <div className="flex items-center justify-between mx-auto w-full bg-gray-200 rounded-xl max-w-sm mt-3 text-base">
                        <button
                            onClick={handleDecrement}
                            className="px-5 py-3 bg-black text-white  rounded-l-xl border-r-2 border-gray-300 flex items-center justify-center"
                        >
                            -
                        </button>
                        <span className="w-16 text-center py-2 text-xl">{count}</span>
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
