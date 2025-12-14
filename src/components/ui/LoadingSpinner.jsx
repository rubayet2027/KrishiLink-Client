import { FaSeedling } from 'react-icons/fa';

const LoadingSpinner = ({ fullScreen = true, size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-green-200 border-t-green-600 rounded-full animate-spin`} />
        <FaSeedling className="absolute inset-0 m-auto text-green-600 text-xl animate-pulse" />
      </div>
      <p className="text-gray-600 font-medium animate-pulse-soft">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      {content}
    </div>
  );
};

export default LoadingSpinner;
