import { FaStethoscope, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FaStethoscope className="text-primary-400 text-2xl" />
              <span className="text-xl font-bold">DocFind India</span>
            </div>
            <p className="text-gray-400 mb-4">
              India’s trusted platform for finding the best doctors and booking appointments. 
              We connect patients with top healthcare professionals across all specialties, cities, and languages.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-400 hover:text-white transition-colors">
                  Find Doctors
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-400 hover:text-white transition-colors">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <FaPhone className="text-primary-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaEnvelope className="text-primary-400" />
                <span>support@docfind.in</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaMapMarkerAlt className="text-primary-400" />
                <span>Delhi, Mumbai, Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DocFind India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
