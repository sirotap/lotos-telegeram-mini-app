/* eslint-disable react/prop-types */
const OrderConfirmationModal = ({ isOpen, onClose, onConfirm, totalPrice }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Подтвердить заказ?</h2>
                <p className="mb-4 dark:text-gray-300">Общая стоимость: {totalPrice.toLocaleString()} сум</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded-lg"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-primary-50 text-white rounded-lg"
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;