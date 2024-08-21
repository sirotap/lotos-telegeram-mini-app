/* eslint-disable react/prop-types */
// CardOrder component
const CardOrder = ({ item, quantity, onUpdateOrder }) => {
    return (
        <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow">
            <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.price.toLocaleString()} so&apos;m</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => onUpdateOrder(item.id, Math.max(0, quantity - 1))}
                    className="px-2 py-1 bg-gray-200 rounded-l"
                >
                    -
                </button>
                <span className="px-4 py-1 bg-gray-100">{quantity}</span>
                <button
                    onClick={() => onUpdateOrder(item.id, quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CardOrder;