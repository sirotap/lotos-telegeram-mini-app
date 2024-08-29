import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const NavbarTop = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <nav className="border-b-2 border-b-primary-50 navbar sticky top-0 bg-white dark:bg-gray-800 z-50 flex justify-between items-center px-4">
            <h2 className="text-4xl font-[700] text-center py-2 dark:text-white">Комплекс Лотос</h2>
            <button
                onClick={() => {
                    toggleTheme();
                }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
            >
                {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>
        </nav>
    );
};

export default NavbarTop;