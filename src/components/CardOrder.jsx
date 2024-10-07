/* eslint-disable react/prop-types */
const CardOrder = ({ item, quantity, onUpdateOrder }) => {
    if (!item) {
        return null;
    }

    return (
        <div className="flex justify-between items-center mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div>
                <h3 className="text-lg font-semibold dark:text-white">{item.name}</h3>
                <p className="dark:text-gray-300">{item.price.toLocaleString()} сум</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => onUpdateOrder(item.id, Math.max(0, quantity - 1))}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-l"
                >
                    -
                </button>
                <span className="px-4 py-1 bg-gray-100 dark:bg-gray-600 dark:text-black">{quantity}</span>
                <button
                    onClick={() => onUpdateOrder(item.id, quantity + 1)}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-r"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CardOrder;