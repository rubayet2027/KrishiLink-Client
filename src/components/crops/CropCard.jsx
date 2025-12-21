import { Link } from 'react-router-dom';
import { HiLocationMarker, HiCurrencyBangladeshi, HiCalendar } from 'react-icons/hi';
import { FaLeaf } from 'react-icons/fa';


const CropCard = ({ crop }) => {
  // Support both old and new field names for backward compatibility
  const {
    _id,
    name,
    category,
    quantity,
    pricePerUnit,
    location,
    images = [],
    harvestDate,
    owner = {}
  } = crop;

  const displayTitle = name || 'Crop';
  const displayImage = Array.isArray(images) && images.length > 0 ? images[0] : images[1] || '';
  const displayCategory = category || '';
  const displayOwnerName = owner.displayName || owner.email || 'User';
  const displayOwnerPhoto = owner.photoURL || '';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <FaLeaf className="text-xs" />
            {displayCategory}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">{displayTitle}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <HiCurrencyBangladeshi className="text-lg text-green-600" />
            <span className="font-semibold text-green-600">৳{pricePerUnit}</span>
            <span className="text-sm">/ {quantity}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <HiLocationMarker className="text-lg text-amber-500" />
            <span className="text-sm truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <HiCalendar className="text-lg text-blue-500" />
            <span className="text-sm">
              Harvest: {harvestDate ? new Date(harvestDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : 'N/A'}
            </span>
          </div>
        </div>
        {/* Owner Info */}
        <div className="flex items-center gap-3 pt-4 border-t">
          {displayOwnerPhoto ? (
            <img
              src={displayOwnerPhoto}
              alt={displayOwnerName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
              {displayOwnerName?.charAt(0)}
            </div>
          )}
          <span className="text-sm text-gray-600 truncate flex-1">{displayOwnerName}</span>
        </div>
        {/* View Details Button */}
        <Link
          to={`/crops/${_id}`}
          className="mt-4 block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2.5 rounded-lg font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CropCard;
