import { Link } from 'react-router-dom';
import { FaSeedling, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <FaSeedling className="text-3xl text-green-500" />
              <span className="text-2xl font-bold">
                <span className="text-green-500">Krishi</span>
                <span className="text-amber-400">Link</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Connecting farmers with buyers directly. Empowering agriculture through technology and community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/crops" className="text-gray-400 hover:text-green-500 transition-colors">
                  All Crops
                </Link>
              </li>
              <li>
                <Link to="/add-crop" className="text-gray-400 hover:text-green-500 transition-colors">
                  Add Crop
                </Link>
              </li>
              <li>
                <Link to="/my-posts" className="text-gray-400 hover:text-green-500 transition-colors">
                  My Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <HiLocationMarker className="text-green-500 text-lg shrink-0" />
                <span className="text-gray-400">123 Agriculture Road, Farm City</span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-green-500 text-lg shrink-0" />
                <span className="text-gray-400">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-green-500 text-lg shrink-0" />
                <span className="text-gray-400">support@krishilink.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} KrishiLink. All rights reserved. Made with 💚 for farmers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
