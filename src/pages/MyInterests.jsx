import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HiEye, HiCheckCircle, HiXCircle, HiClock } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import SectionTitle from '../components/ui/SectionTitle';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import { interestsAPI } from '../services/api';

const MyInterests = () => {
  const { user } = useAuth();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyInterests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await interestsAPI.getByUser(user.email);
      setInterests(response.data);
    } catch (err) {
      setError('Failed to load your interests. Please try again.');
      console.error('Error fetching interests:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      fetchMyInterests();
    }
  }, [user?.email, fetchMyInterests]);

  const getStatusBadge = (status) => {
    const badges = {
      pending: (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <HiClock />
          Pending
        </span>
      ),
      accepted: (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <HiCheckCircle />
          Accepted
        </span>
      ),
      rejected: (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <HiXCircle />
          Rejected
        </span>
      ),
    };
    return badges[status] || badges.pending;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ErrorMessage message={error} onRetry={fetchMyInterests} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="My Interests"
          subtitle="Track all the crops you've expressed interest in"
        />

        {interests.length === 0 ? (
          <EmptyState
            title="No Interests Yet"
            description="You haven't expressed interest in any crops yet. Browse available crops and find something you like!"
            icon={FaHeart}
            actionLabel="Browse Crops"
            actionLink="/crops"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest) => (
              <div
                key={interest._id}
                className="bg-white rounded-xl shadow-md overflow-hidden card-hover"
              >
                {/* Status Banner */}
                <div className={`px-4 py-2 ${
                  interest.status === 'accepted' 
                    ? 'bg-green-500' 
                    : interest.status === 'rejected'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                }`}>
                  <p className="text-white text-sm font-medium text-center">
                    {interest.status === 'accepted' && '🎉 Your interest has been accepted!'}
                    {interest.status === 'rejected' && 'Interest was declined'}
                    {interest.status === 'pending' && '⏳ Waiting for farmer response'}
                  </p>
                </div>

                <div className="p-5">
                  {/* Crop Info */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {interest.cropName}
                  </h3>

                  {/* Submitted Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Phone Shared:</span>
                      <span className="text-gray-800 font-medium">{interest.phone}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Submitted On:</span>
                      <span className="text-gray-800">
                        {new Date(interest.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    {interest.message && (
                      <div className="mt-2">
                        <span className="text-gray-500 text-sm">Your Message:</span>
                        <p className="text-gray-700 text-sm mt-1 bg-gray-50 p-2 rounded">
                          {interest.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-gray-500">Status:</span>
                    {getStatusBadge(interest.status)}
                  </div>

                  {/* View Crop Button */}
                  <Link
                    to={`/crops/${interest.cropId}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    <HiEye />
                    View Crop Details
                  </Link>

                  {/* Contact Info (if accepted) */}
                  {interest.status === 'accepted' && interest.ownerPhone && (
                    <div className="mt-4 bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        Farmer Contact: {interest.ownerPhone}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        You can now contact the farmer directly!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterests;
