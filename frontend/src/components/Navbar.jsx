import { Link } from 'react-router-dom';
import { FaStethoscope, FaUserMd, FaCalendarCheck } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaStethoscope className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">DocFind India</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium flex items-center space-x-1"
            >
              <FaUserMd />
              <span>Find Doctors</span>
            </Link>
            <Link 
              to="/search" 
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium flex items-center space-x-1"
            >
              <FaCalendarCheck />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/search" 
              className="btn-primary hidden sm:block"
            >
              Find a Doctor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
