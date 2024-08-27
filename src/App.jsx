import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';
import LoadingPage from '@/components/Loading';
import AppRoutes from '@/routes/Routes';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingClass, setLoadingClass] = useState('loading-anima');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [offlineTimer, setOfflineTimer] = useState(60);
    const [showOfflineMessage, setShowOfflineMessage] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 800 });

        // Simulate loading time
        const timer = setTimeout(() => {
            setLoadingClass('loading-anima slide-up'); // Trigger animation
            setTimeout(() => setIsLoading(false), 500); // Wait for animation to finish
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setOfflineTimer(60);
        };
        const handleOffline = () => {
            setIsOnline(false);
            setShowOfflineMessage(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        let intervalId;
        if (!isOnline && offlineTimer > 0) {
            intervalId = setInterval(() => {
                setOfflineTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (offlineTimer === 0) {
            window.location.href = 'https://kun.uz';
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isOnline, offlineTimer]);

    if (isLoading) {
        return <div className={loadingClass}><LoadingPage /></div>;
    }

    if (!isOnline) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Internet aloqasi uzildi</h2>
                    <p className="mb-4">Iltimos, internet aloqangizni tekshiring va qayta ulaning.</p>
                    {showOfflineMessage && (
                        <p className="text-sm text-gray-600">
                            Agar {offlineTimer} soniya ichida internet tiklanmasa, siz avtomatik ravishda kun.uz saytiga yo&apos;naltirilasiz.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <main className='bg-white'>
            <Toaster position="top-right" reverseOrder={false} />
            <AppRoutes />
        </main>
    );
}
