import { useState } from 'react';
import { HiUser, HiMail, HiCamera, HiPencil, HiCheck, HiX } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import SectionTitle from '../components/ui/SectionTitle';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.displayName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-fadeIn">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="My Profile"
          subtitle="Manage your account information"
        />

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-10">
            <div className="flex flex-col items-center">
              {user?.photoURL ? (
                <img
                  src={editing ? formData.photoURL || user.photoURL : user.photoURL}
                  alt={user.displayName}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=16a34a&color=fff`;
                  }}
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-green-500 flex items-center justify-center text-white text-4xl font-bold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                </div>
              )}
              <h2 className="text-2xl font-bold text-white mt-4">
                {user?.displayName || 'User'}
              </h2>
              <p className="text-green-100">{user?.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            {!editing ? (
              // View Mode
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <HiUser className="text-gray-400 text-xl" />
                    <span className="text-gray-800 font-medium">
                      {user?.displayName || 'Not set'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <HiMail className="text-gray-400 text-xl" />
                    <span className="text-gray-800 font-medium">{user?.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Profile Photo URL
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <HiCamera className="text-gray-400 text-xl" />
                    <span className="text-gray-800 font-medium truncate">
                      {user?.photoURL || 'Not set'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Account Created
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800 font-medium">
                      {user?.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'Unknown'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  <HiPencil />
                  Edit Profile
                </button>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <HiUser className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <HiMail className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <HiCamera className="inline mr-2" />
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                  >
                    <HiX />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg font-medium transition-colors ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    <HiCheck />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
