// Routes.jsx
import { useRoutes } from 'react-router-dom';
import Start from '@/pages/starter/Welcome';
import Dashboard from '@/pages/Dashboard';

export default function AppRoutes() {
    const routes = useRoutes([
        { path: '/', element: <Start /> },
        { path: '/welcome/*', element: <Start /> },
        { path: '/dashboard/*', element: <Dashboard /> },
    ]);

    return routes;
}
