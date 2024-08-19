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

        // Request animation frame for better timing control
        const handleLoad = () => {
            requestAnimationFrame(() => {
                setLoadingClass('loading-anima slide-up'); // Trigger animation
                setTimeout(() => setIsLoading(false), 500); // Wait for animation to finish
            });
        };

        window.addEventListener('load', handleLoad);

        return () => window.removeEventListener('load', handleLoad);
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
