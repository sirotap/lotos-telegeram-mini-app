import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import illustration1 from "@/assets/Illustration_1.png";
import illustration2 from "@/assets/Illustration_2.png";
import illustration3 from "@/assets/Illustrations_3.png";
import illustration4 from "@/assets/Illustrations_4.png";
import logo from '@/assets/g14.png';
import circleImg from '@/assets/circle_background.png';
import Loading from "@/components/Loading"
const Welcome = () => (
    <>
        <div>
            <img src={illustration1} alt="illustration" className="h-56 w-48" loading="lazy"/>
        </div>
        <div className="h-32">
            <h3 className="text-2xl font-semibold">Добро пожаловать</h3>
            <p className="text-base px-5 pt-5">Приятно познакомиться. Мы рады, что вы здесь, так что давайте начнем!</p>
        </div>
    </>
);

const AllYourFavorites = () => (
    <>
        <div>
            <img src={illustration2} alt="illustration"className="h-56 w-56" loading="lazy" />
        </div>
        <div className="h-32">
            <h3 className="text-2xl font-semibold">Все ваши любимые блюда</h3>
            <p className="text-base px-5 pt-5">Заказывайте в лучших местных ресторанах с легкой доставкой по требованию.</p>
        </div>
    </>
);

const FreeDeliveryOffers = () => (
    <>
        <div>
            <img src={illustration3} alt="illustration" className="h-56 w-56" loading="lazy"/>
        </div>
        <div className="h-32">
            <h3 className="text-2xl font-semibold">Предложения бесплатной доставки</h3>
            <p className="text-base px-5 pt-5">Бесплатная доставка для новых клиентов через Apple Pay и другие способы оплаты.</p>
        </div>
    </>
);

const ChooseYourFood = () => ( 
    <>
        <div>
            <img src={illustration4} alt="illustration" className="h-56 w-48" loading="lazy"/>
        </div>
        <div className="h-32">
            <h3 className="text-2xl font-semibold">Выберите свою еду</h3>
            <p className="text-base px-5 pt-5">Легко найдите тип еды, которую вы хотите, и получите доставку в широком диапазоне.</p>
        </div>
    </>
);

const Start = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (step === 3) {
            setIsLoading(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // 2 sekunddan keyin `/dashboard` sahifasiga o'tadi
        } else {
            const nextStep = step + 1;
            if (nextStep <= 3) {
                setStep(nextStep);
                navigate(`/welcome/${nextStep}`);
            }
        }
    };

    return (
        <div className="flex flex-col items-center text-center pt-10 justify-around h-[100svh] px-5 bg-white">
            <img src={circleImg} alt="circle" className="absolute -z-10 top-0 left-0" />
            <div className="flex items-center gap-x-2">
                <img src={logo} alt="img" className="w-14" />
                <h1 className="text-4xl font-bold">Tamang <br /> FoodService</h1>
            </div>
            <Routes>
                <Route path="/1" element={<AllYourFavorites />} />
                <Route path="/2" element={<FreeDeliveryOffers />} />
                <Route path="/3" element={<ChooseYourFood />} />
                <Route path="/" element={<Welcome />} />
            </Routes>
            <footer className="w-full">
                {isLoading ? (
                    <Loading /> // O'tish vaqtida Loading komponenti ko'rinadi
                ) : (
                    <button 
                        onClick={handleNext} 
                        className="bg-primary-50 text-white text-base w-full py-3 rounded-md"
                    >
                        {step === 3 ? "Посмотреть меню" : "Далее"}
                    </button>
                )}
            </footer>
        </div>
    );
};

export default Start;
