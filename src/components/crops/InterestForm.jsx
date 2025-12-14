import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { interestsAPI } from '../../services/api';
import { HiCheckCircle, HiUser, HiMail, HiPhone, HiChat } from 'react-icons/hi';

const InterestForm = ({ crop, onSubmitSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    message: ''
  });

  // Check if user has already submitted interest
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      if (!user?.email || !crop?._id) {
        setCheckingStatus(false);
        return;
      }

      try {
        const response = await interestsAPI.checkSubmitted(crop._id, user.email);
        setHasSubmitted(response.data.hasSubmitted);
      } catch (error) {
        console.error('Error checking submission status:', error);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkSubmissionStatus();
  }, [user?.email, crop?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      await interestsAPI.submit({
        cropId: crop._id,
        cropName: crop.cropName,
        buyerName: user.displayName,
        buyerEmail: user.email,
        buyerPhoto: user.photoURL,
        phone: formData.phone,
        message: formData.message,
        ownerEmail: crop.ownerEmail,
        status: 'pending'
      });

      toast.success('Interest submitted successfully!');
      setHasSubmitted(true);
      onSubmitSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit interest');
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Check if user is the owner
  if (user?.email === crop?.ownerEmail) {
    return null;
  }

  if (hasSubmitted) {
    return (
      <div className="bg-green-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <HiCheckCircle className="text-3xl text-green-600" />
          <h3 className="text-xl font-bold text-green-800">Interest Submitted</h3>
        </div>
        <p className="text-green-700">
          You have already expressed interest in this crop. The farmer will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Express Your Interest</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pre-filled fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <HiUser className="inline mr-1" /> Name
            </label>
            <input
              type="text"
              value={user?.displayName || ''}
              disabled
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <HiMail className="inline mr-1" /> Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
            />
          </div>
        </div>

        {/* Phone number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <HiPhone className="inline mr-1" /> Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <HiChat className="inline mr-1" /> Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Add any additional message for the farmer..."
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Interest'}
        </button>
      </form>
    </div>
  );
};

export default InterestForm;
