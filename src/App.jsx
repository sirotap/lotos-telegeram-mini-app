import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Start from './starter/Welcome';
export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    // const location = useLocation();

    useEffect(() => {
        Aos.init({ duration: 800 });

        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Adjust the time as needed

        return () => clearTimeout(timer);

    }, []);

    const routes = useRoutes([
        { path: '/', element: <Start /> },
        { path: '/welcome/*', element: <Start /> },

    ]);
    // const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isLoading) {
        return <h1>Yuklanmoqda</h1>;
    }
    return (
        <>
            {/* {!isAuthPage && <Index />} */}

            <Toaster position="top-right" reverseOrder={false} />
            {routes}
            {/* {!isAuthPage && <Bottom />} */}
        </>

    )
}