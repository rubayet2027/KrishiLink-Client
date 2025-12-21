import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash, HiEye, HiPlus } from 'react-icons/hi';
import { FaSeedling } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import SectionTitle from '../components/ui/SectionTitle';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import toast from 'react-hot-toast';
import { cropsAPI } from '../services/api';

const MyPosts = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cropToDelete, setCropToDelete] = useState(null);

  const fetchMyCrops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cropsAPI.getMyPosts();
      // Map backend fields to UI fields for compatibility
      const crops = (response.data?.data || []).map(crop => ({
        _id: crop._id,
        cropName: crop.name || crop.title || '',
        cropType: crop.category || '',
        pricePerUnit: crop.pricePerUnit,
        quantity: crop.quantity,
        location: crop.location,
        cropImage: Array.isArray(crop.images) ? (crop.images[0] || '') : '',
      }));
      setCrops(crops);
    } catch (err) {
      setError('Failed to load your crops. Please try again.');
      console.error('Error fetching crops:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetchMyCrops();
    }
  }, [user?.email, fetchMyCrops]);

  const handleDeleteClick = (crop) => {
    setCropToDelete(crop);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!cropToDelete) return;

    setDeletingId(cropToDelete._id);
    try {
      await cropsAPI.delete(cropToDelete._id);
      toast.success('Crop deleted successfully');
      setCrops(crops.filter(crop => crop._id !== cropToDelete._id));
    } catch {
      toast.error('Failed to delete crop');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setCropToDelete(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ErrorMessage message={error} onRetry={fetchMyCrops} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <SectionTitle
            title="My Posts"
            subtitle="Manage your crop listings"
            centered={false}
          />
          <Link
            to="/add-crop"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 md:mt-0"
          >
            <HiPlus className="text-xl" />
            Add New Crop
          </Link>
        </div>

        {crops.length === 0 ? (
          <EmptyState
            title="No Crops Posted Yet"
            description="You haven't posted any crops. Start by adding your first crop listing!"
            icon={FaSeedling}
            actionLabel="Add Your First Crop"
            actionLink="/add-crop"
          />
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Crop
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {crops.map((crop) => (
                    <tr key={crop._id} className="hover:bg-gray-50">
                      {/* Crop Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={crop.cropImage}
                            alt={crop.cropName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium text-gray-800">{crop.cropName}</span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {crop.cropType}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">৳{crop.pricePerUnit}</span>
                      </td>

                      {/* Quantity */}
                      <td className="px-6 py-4 text-gray-600">{crop.quantity}</td>

                      {/* Location */}
                      <td className="px-6 py-4 text-gray-600">{crop.location}</td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/crops/${crop._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <HiEye className="text-xl" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(crop)}
                            disabled={deletingId === crop._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <HiTrash className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Crop</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{cropToDelete?.cropName}"? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCropToDelete(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deletingId}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {deletingId ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
