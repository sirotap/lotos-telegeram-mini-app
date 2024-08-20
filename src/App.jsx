import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';
import LoadingPage from '@/components/Loading';
import AppRoutes from '@/routes/Routes';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingClass, setLoadingClass] = useState('loading-anima');

    useEffect(() => {
        Aos.init({ duration: 800 });

        // Simulate loading time
        const timer = setTimeout(() => {
            setLoadingClass('loading-anima slide-up'); // Trigger animation
            setTimeout(() => setIsLoading(false), 500); // Wait for animation to finish
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div className={loadingClass}><LoadingPage /></div>;
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <AppRoutes />
        </>
    );
}
