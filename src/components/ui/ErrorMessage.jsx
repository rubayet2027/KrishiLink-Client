import { HiExclamationCircle } from 'react-icons/hi';

const ErrorMessage = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <HiExclamationCircle className="text-6xl text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops!</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
