import { CiForkAndKnife, CiSquareChevDown, CiSearch, CiUser } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarBottom = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    return (
        <footer className="flex">
            <div 
                onClick={() => navigate('/dashboard')} 
                className={`w-1/4 text-center text-sm font-semibold border p-2 flex flex-col items-center ${isActive('/dashboard') ? 'text-primary-50' : 'text-gray-400'}`}
            >
                <CiForkAndKnife className="text-2xl" />
                <h2 className="mt-1 font-normal">Home</h2>
            </div>
            <div 
                onClick={() => navigate('search')} 
                className={`w-1/4 text-center text-sm font-semibold border p-2 flex flex-col items-center ${isActive('/dashboard/search') ? 'text-primary-50' : 'text-gray-400'}`}
            >
                <CiSearch className="text-2xl" />
                <h2 className="mt-1 font-normal">Qidirish</h2>
            </div>
            <div 
                onClick={() => navigate('orders')} 
                className={`w-1/4 text-center text-sm font-semibold border p-2 flex flex-col items-center ${isActive('/dashboard/orders') ? 'text-primary-50' : 'text-gray-400'}`}
            >
                <CiSquareChevDown className="text-2xl" />
                <h2 className="mt-1 font-normal">Orders</h2>
            </div>
            <div 
                onClick={() => navigate('profile')} 
                className={`w-1/4 text-center text-sm font-semibold border p-2 flex flex-col items-center ${isActive('/dashboard/profile') ? 'text-primary-50' : 'text-gray-400'}`}
            >
                <CiUser className="text-2xl" />
                <h2 className="mt-1 font-normal">Profile</h2>
            </div>
        </footer>
    );
};

export default NavbarBottom;
