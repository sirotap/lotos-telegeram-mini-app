import { CiForkAndKnife, CiSquareChevDown } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarBottom = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    return (
        <footer className="flex sticky bottom-0 bg-white">
            <div 
                onClick={() => navigate('/dashboard')} 
                className={`w-1/2 text-center text-sm font-semibold border p-2 flex flex-col items-center ${isActive('/dashboard') ? 'text-primary-50' : 'text-gray-400'}`}
            >
                <CiForkAndKnife className="text-2xl" />
                <h2 className="mt-1 font-normal">Home</h2>
            </div>
            <div 
                onClick={() => navigate('orders')} 
                className={`w-1/2 text-center text-sm font-semibold border p-2 flex flex-col items-center ${isActive('/dashboard/orders') ? 'text-primary-50' : 'text-gray-400'}`}
            >
                <CiSquareChevDown className="text-2xl" />
                <h2 className="mt-1 font-normal">Orders</h2>
            </div>
        </footer>
    );
};

export default NavbarBottom;
