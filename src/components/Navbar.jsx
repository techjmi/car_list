import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { DataContext } from '../context/DataProvider';
import SearchComponent from './SearchComponent';
import UserProfile from './Userprofile';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cars } = useContext(DataContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-10 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-300">MyApp</Link>
        </div>

        {/* Search Component */}
        <div className="hidden sm:block w-1/3 items-start">
          <SearchComponent cars={cars} />
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
          <Link to="/add-car" className="hover:text-gray-300 transition duration-300">Add Car</Link>
          <Link to="/user-car" className="hover:text-gray-300 transition duration-300">Your List</Link>
        </div>

        {/* User Profile */}
        <div className="hidden sm:block">
          <UserProfile />
        </div>

        {/* Hamburger Icon */}
        <button onClick={toggleSidebar} className="sm:hidden text-2xl focus:outline-none">
          {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">MyApp</h2>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link to="/" onClick={toggleSidebar} className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link to="/add-car" onClick={toggleSidebar} className="hover:text-gray-300 transition duration-300">
            Add Car
          </Link>
          <Link to="/user-car" onClick={toggleSidebar} className="hover:text-gray-300 transition duration-300">
            Your List
          </Link>
          
          {/* Search Component for Mobile */}
          <div className="relative mt-4">
            <SearchComponent cars={cars} />
          </div>
          
          {/* User Profile */}
          <UserProfile />
        </div>
      </div>

      {/* Overlay to close sidebar on outside click */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
