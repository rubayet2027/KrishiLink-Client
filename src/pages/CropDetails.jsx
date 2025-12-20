import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  HiLocationMarker, 
  HiCurrencyBangladeshi, 
  HiCalendar, 
  HiMail, 
  HiPhone,
  HiArrowLeft,
  HiClipboardList
} from 'react-icons/hi';
import { FaLeaf, FaWeight, FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import InterestForm from '../components/crops/InterestForm';
import InterestTable from '../components/crops/InterestTable';
import { cropsAPI, interestsAPI } from '../services/api';

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [crop, setCrop] = useState(null);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  // Use backend owner object for ownership check
  const isOwner = user && crop && crop.owner && user.email === crop.owner.email;

  const fetchCropDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cropsAPI.getById(id);
      // Support both { success, data } and direct data
      const cropData = response.data?.data || response.data;
      setCrop(cropData);
    } catch (err) {
      setError('Failed to load crop details. Please try again.');
      console.error('Error fetching crop details:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchInterests = useCallback(async () => {
    if (!isOwner) return;
    try {
      const response = await interestsAPI.getByCrop(id);
      setInterests(response.data);
    } catch (err) {
      console.error('Error fetching interests:', err);
    }
  }, [id, isOwner]);

  useEffect(() => {
    fetchCropDetails();
  }, [fetchCropDetails]);

  useEffect(() => {
    if (crop && isOwner) {
      fetchInterests();
    }
  }, [crop, isOwner, fetchInterests]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ErrorMessage message={error} onRetry={fetchCropDetails} />
      </div>
    );
  }


  if (!crop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ErrorMessage message="Crop not found" />
      </div>
    );
  }

  // Destructure backend fields for clarity
  const {
    name,
    description,
    category,
    quantity,
    unit,
    pricePerUnit,
    location,
    images = [],
    harvestDate,
    owner: cropOwner = {},
  } = crop;

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium mb-6 transition-colors"
        >
          <HiArrowLeft />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-100">
                <img
                  src={Array.isArray(images) && images.length > 0 ? images[0] : ''}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <FaLeaf />
                    {category}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs for Owner */}
            {isOwner && (
              <div className="bg-white rounded-xl shadow-md">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 py-4 font-medium transition-colors ${
                      activeTab === 'details'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    Crop Details
                  </button>
                  <button
                    onClick={() => setActiveTab('interests')}
                    className={`flex-1 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'interests'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <HiClipboardList />
                    Manage Interests
                    {interests.length > 0 && (
                      <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">
                        {interests.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <HiCurrencyBangladeshi className="text-xl" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">৳{pricePerUnit}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <FaWeight className="text-lg" />
                      <span className="text-sm font-medium">Quantity</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{quantity} {unit}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <HiCalendar className="text-xl" />
                      <span className="text-sm font-medium">Harvest</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {harvestDate ? new Date(harvestDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <HiLocationMarker className="text-xl" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800 truncate">{location}</p>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              </div>
            )}

            {/* Interests Tab (Owner Only) */}
            {activeTab === 'interests' && isOwner && (
              <InterestTable interests={interests} onStatusUpdate={fetchInterests} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Farmer Information</h3>
              <div className="flex items-center gap-4 mb-4">
                {cropOwner.photoURL ? (
                  <img
                    src={cropOwner.photoURL}
                    alt={cropOwner.displayName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold">
                    {cropOwner.displayName?.charAt(0) || cropOwner.email?.charAt(0) || '?'}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-800">{cropOwner.displayName || 'Unknown'}</p>
                  <p className="text-sm text-gray-500">Verified Farmer</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <HiMail className="text-green-600 text-lg" />
                  <span className="text-sm break-all">{cropOwner.email || 'N/A'}</span>
                </div>
                {cropOwner.phone && (
                  <div className="flex items-center gap-3">
                    <HiPhone className="text-green-600 text-lg" />
                    <span className="text-sm">{cropOwner.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <HiLocationMarker className="text-green-600 text-lg" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>
            </div>

            {/* Interest Form (Non-Owner Only) */}
            {!isOwner && (
              <InterestForm crop={crop} onSubmitSuccess={fetchCropDetails} />
            )}

            {/* Owner Badge */}
            {isOwner && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <FaUser className="text-amber-600 text-xl" />
                  <h3 className="text-lg font-bold text-amber-800">Your Listing</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  This is your crop listing. You can manage buyer interests from the tab above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
