import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Start from './starter/Welcome';
import LoadingPage from './components/Loading';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingClass, setLoadingClass] = useState('loading-anima');

    useEffect(() => {
        Aos.init({ duration: 800 });

        // Sahifa to'liq yuklanganini kutish
        window.addEventListener('load', () => {
            setLoadingClass('loading-anima slide-up'); // Animatsiyani boshlash
            setTimeout(() => setIsLoading(false), 500); // Animatsiya tugagach, yuklanishni to'xtatish
        });

    }, []);

    const routes = useRoutes([
        { path: '/', element: <Start /> },
        { path: '/welcome/*', element: <Start /> },
    ]);

    if (isLoading) {
        return <div className={loadingClass}><LoadingPage /></div>;
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            {routes}
        </>
    );
}
