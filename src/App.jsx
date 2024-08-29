import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';
import LoadingPage from '@/components/Loading';
import AppRoutes from '@/routes/Routes';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingClass, setLoadingClass] = useState('loading-anima');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [offlineTimer, setOfflineTimer] = useState(60);
    const [showOfflineMessage, setShowOfflineMessage] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 800 });

        const timer = setTimeout(() => {
            setLoadingClass('loading-anima slide-up');
            setTimeout(() => setIsLoading(false), 500);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setOfflineTimer(60);
            setShowOfflineMessage(false);
        };
        const handleOffline = () => {
            setIsOnline(false);
            setShowOfflineMessage(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        let intervalId;
        if (!isOnline && offlineTimer > 0) {
            intervalId = setInterval(() => {
                setOfflineTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        window.location.href = 'https://kun.uz';
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isOnline, offlineTimer]);

    if (isLoading) {
        return <div className={loadingClass}><LoadingPage /></div>;
    }

    return (
        <ThemeProvider>
            <main className='bg-white dark:bg-gray-900'>
                <Toaster position="top-right" reverseOrder={false} />
                {!isOnline && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Соединение с интернетом потеряно</h2>
                            <p className="mb-4 dark:text-gray-300">Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова.</p>
                            {showOfflineMessage && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Если интернет не восстановится в течение {offlineTimer} секунд, вы будете автоматически перенаправлены на сайт kun.uz.
                                </p>
                            )}
                            <div className="mt-4 text-3xl font-bold dark:text-white">
                                {offlineTimer}
                            </div>
                        </div>
                    </div>
                )}
                <AppRoutes />
            </main>
        </ThemeProvider>
    );
}