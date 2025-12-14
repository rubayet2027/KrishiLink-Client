import { HiInbox } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  title = 'No data found', 
  description = 'There is nothing to display here yet.',
  icon: IconComponent = HiInbox,
  actionLabel,
  actionLink 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <IconComponent className="text-6xl text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">{description}</p>
      {actionLabel && actionLink && (
        <Link
          to={actionLink}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
