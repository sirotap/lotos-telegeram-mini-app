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
            <h3 className="text-2xl font-semibold">Welcome</h3>
            <p className="text-base px-5 pt-5">It’s a pleasure to meet you. We are excited that you’re here so let’s get started!</p>
        </div>
    </>
);

const AllYourFavorites = () => (
    <>
        <div>
            <img src={illustration2} alt="illustration"className="h-56 w-56" loading="lazy" />
        </div>
        <div className="h-32">
            <h3 className="text-2xl font-semibold">All your favorites</h3>
            <p className="text-base px-5 pt-5">Order from the best local restaurants with easy, on-demand delivery.</p>
        </div>
    </>
);

const FreeDeliveryOffers = () => (
    <>
        <div>
            <img src={illustration3} alt="illustration" className="h-56 w-56" loading="lazy"/>
        </div>
        <div className="h-32">
            <h3 className="text-2xl font-semibold">Free delivery offers</h3>
            <p className="text-base px-5 pt-5">Free delivery for new customers via Apple Pay and others payment methods.</p>
        </div>
    </>
);

const ChooseYourFood = () => ( 
    <>
        <div>
            <img src={illustration4} alt="illustration" className="h-56 w-48" loading="lazy"/>
        </div>
        <div className="h-32">
            <h3 className="text-2xl font-semibold">Choose your food</h3>
            <p className="text-base px-5 pt-5">Easily find your type of food craving and you’ll get delivery in wide range.</p>
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
        <div className="flex flex-col items-center text-center pt-10 justify-around h-[100svh] px-5">
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
                        {step === 3 ? "Menyuni ko'rish" : "Next"}
                    </button>
                )}
            </footer>
        </div>
    );
};

export default Start;
