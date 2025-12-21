import { useState } from 'react';
import { HiCheckCircle, HiXCircle, HiClock, HiMail, HiPhone, HiChat } from 'react-icons/hi';
import { interestsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const InterestTable = ({ interests, onStatusUpdate }) => {
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusUpdate = async (cropId, interestId, newStatus) => {
    setUpdatingId(interestId);
    try {
      await interestsAPI.updateStatus(cropId, interestId, newStatus);
      toast.success(`Interest ${newStatus === 'accepted' ? 'accepted' : 'rejected'} successfully`);
      onStatusUpdate?.();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <HiClock /> Pending
        </span>
      ),
      accepted: (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <HiCheckCircle /> Accepted
        </span>
      ),
      rejected: (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <HiXCircle /> Rejected
        </span>
      ),
    };
    return badges[status] || badges.pending;
  };

  if (!interests || interests.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">No interests received yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Buyer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {interests.map((interest) => (
              <tr key={interest._id} className="hover:bg-gray-50">
                {/* Buyer Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {interest.buyerPhoto ? (
                      <img
                        src={interest.buyerPhoto}
                        alt={interest.buyerName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                        {interest.buyerName?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{interest.buyerName}</p>
                      <p className="text-sm text-gray-500">{interest.buyerEmail}</p>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <HiPhone className="text-green-600" />
                      {interest.phone}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <HiMail className="text-blue-600" />
                      {interest.buyerEmail}
                    </p>
                  </div>
                </td>

                {/* Message */}
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-xs truncate">
                    {interest.message || (
                      <span className="text-gray-400 italic">No message</span>
                    )}
                  </p>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {getStatusBadge(interest.status)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  {interest.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(interest.cropId, interest._id, 'accept')}
                        disabled={updatingId === interest._id}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(interest.cropId, interest._id, 'reject')}
                        disabled={updatingId === interest._id}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterestTable;
