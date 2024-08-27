import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavbarTop from "./NavbarTop";
import { ApiService } from '../api/api';
import { FaClipboard, FaShoppingBasket } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const OrderById = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        const fetchOrderIngredients = async () => {
            const searchParams = new URLSearchParams(location.search);
            const orderId = id || searchParams.get('id');

            if (!orderId) {
                setError("Buyurtma ID si ko'rsatilmagan");
                setLoading(false);
                return;
            }

            try {
                const data = await ApiService.getOrderIngredients(orderId);
                if (data) {
                    // Bir xil ingredientlarni birlashtirish
                    const combinedIngredients = data.ingredients.reduce((acc, curr) => {
                        const existingIngredient = acc.find(item => item.ingredientName === curr.ingredientName);
                        if (existingIngredient) {
                            existingIngredient.quantity += curr.quantity;
                        } else {
                            acc.push({...curr});
                        }
                        return acc;
                    }, []);
                    
                    setOrderData({...data, ingredients: combinedIngredients});
                } else {
                    setError('Ma\'lumot topilmadi');
                }
            } catch (err) {
                setError('Ma\'lumot yuklashda xatolik yuz berdi');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderIngredients();
    }, [id, location]);

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderData.orderId.toString());
        toast.success('Buyurtma ID nusxalandi!');
    };

    if (loading) return <div className="flex justify-center items-center h-screen bg-white"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#EEA734]"></div></div>;
    if (error) return <div className="flex justify-center items-center h-screen bg-white text-[#000000] text-xl">{error}</div>;
    if (!orderData) return <div className="flex justify-center items-center h-screen bg-white text-[#000000] text-xl">Ma&apos;lumot topilmadi</div>;

    return (
        <main className="container mx-auto px-4 bg-white min-h-[100svh]">
            <NavbarTop />
            <section className="mt-8 bg-[#FFFFFF] rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-[#000000]">Buyurtma</h1>
                    <button 
                        onClick={copyOrderId}
                        className="flex items-center bg-[#EEA734] text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300"
                    >
                        #{orderData.orderId} <FaClipboard className="ml-2" />
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-[#000000]">Maxsulotlar:</h2>
                {orderData.ingredients && orderData.ingredients.length > 0 ? (
                    <ul className="space-y-4">
                        {orderData.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center bg-[#EEA734] text-white p-4 rounded-md">
                                <FaShoppingBasket className="mr-4 text-2xl" />
                                <div>
                                    <span className="font-bold">{ingredient.ingredientName}:</span> {ingredient.quantity} {ingredient.measurementUnit}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[#000000]">Ingredientlar mavjud emas</p>
                )}
            </section>
        </main>
    );
};

export default OrderById;