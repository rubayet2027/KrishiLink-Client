import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX, HiUser, HiLogout, HiPlus, HiCollection, HiHeart } from 'react-icons/hi';
import { FaSeedling } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
      setShowDropdown(false);
    } catch {
      toast.error('Failed to logout');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/crops', label: 'All Crops' },
  ];

  const privateLinks = [
    { path: '/add-crop', label: 'Add Crop', icon: HiPlus },
    { path: '/my-posts', label: 'My Posts', icon: HiCollection },
    { path: '/my-interests', label: 'My Interests', icon: HiHeart },
  ];

  const NavLinkItem = ({ path, label, mobile = false }) => (
    <NavLink
      to={path}
      onClick={() => mobile && setIsOpen(false)}
      className={({ isActive }) =>
        `font-medium transition-colors duration-200 ${
          isActive
            ? 'text-green-600'
            : 'text-gray-700 hover:text-green-600'
        } ${mobile ? 'block py-2' : ''}`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FaSeedling className="text-3xl text-green-600" />
            <span className="text-2xl font-bold">
              <span className="text-green-600">Krishi</span>
              <span className="text-amber-500">Link</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLinkItem key={link.path} {...link} />
            ))}
            {user && privateLinks.map((link) => (
              <NavLinkItem key={link.path} {...link} />
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border animate-fadeIn">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium text-gray-800 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <HiUser className="text-lg" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <HiLogout className="text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 text-2xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-slideIn">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLinkItem key={link.path} {...link} mobile />
            ))}
            {user && (
              <>
                <div className="border-t my-2 pt-2">
                  {privateLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600"
                    >
                      <link.icon className="text-lg" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t my-2 pt-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600"
                  >
                    <HiUser className="text-lg" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 text-red-600"
                  >
                    <HiLogout className="text-lg" />
                    Logout
                  </button>
                </div>
              </>
            )}
            {!user && (
              <div className="border-t my-2 pt-2 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-green-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-green-600 text-white text-center py-2 rounded-lg font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
