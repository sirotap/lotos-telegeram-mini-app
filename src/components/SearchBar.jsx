/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ searchTerm, onSearch }) => {
    return (
        <div className="relative px-5 mx-auto mt-3 max-w-sm">
            <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={onSearch}
                className="w-full py-3 pl-12 pr-4 text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-full focus:border-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-opacity-50 transition duration-300 ease-in-out"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-9">
                <CiSearch className="w-6 h-6 text-gray-500" />
            </div>
        </div>
    );
};

export default SearchBar;