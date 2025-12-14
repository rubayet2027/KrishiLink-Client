import { Link } from 'react-router-dom';
import { HiHome, HiArrowLeft } from 'react-icons/hi';
import { FaSeedling } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-[180px] md:text-[220px] font-bold text-green-200">404</span>
            <FaSeedling className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl text-green-600" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off the farm. 
          Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <HiHome className="text-xl" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <HiArrowLeft className="text-xl" />
            Go Back
          </button>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <p className="text-gray-500 text-sm mb-2">While you're here...</p>
          <p className="text-gray-700">
            🌾 Did you know? Bangladesh is the 4th largest rice producer in the world!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
