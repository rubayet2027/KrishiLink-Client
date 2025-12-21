import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiPhotograph, 
  HiCurrencyBangladeshi, 
  HiLocationMarker,
  HiCalendar,
  HiClipboardList
} from 'react-icons/hi';
import { FaSeedling, FaWeight } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import SectionTitle from '../components/ui/SectionTitle';
import toast from 'react-hot-toast';
import { cropsAPI } from '../services/api';

const AddCrop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const cropTypes = [
    'vegetables',
    'fruits',
    'grains',
    'pulses',
    'spices',
    'rice',
    'Others'
  ];

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '', // Single image URL (input only)
    quantity: '',
    unit: 'pieces',
    pricePerUnit: '',
    location: '',
    district: '',
    harvestDate: '',
    description: '',
    status: 'available',
    ownerPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'image') setImagePreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter crop name');
      return;
    }
    if (!formData.category) {
      toast.error('Please select crop type');
      return;
    }
    if (!formData.image.trim()) {
      toast.error('Please enter an image URL');
      return;
    }
    if (!formData.quantity.trim()) {
      toast.error('Please enter quantity');
      return;
    }
    if (!formData.pricePerUnit || formData.pricePerUnit <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Please enter location');
      return;
    }
    if (!formData.district.trim()) {
      toast.error('Please enter district');
      return;
    }
    if (!formData.harvestDate) {
      toast.error('Please select harvest date');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter description');
      return;
    }
    if (!formData.ownerPhone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      // Prepare cropData in new backend format
      const imagesArr = (typeof formData.image === 'string' && formData.image.trim().length > 0)
        ? [formData.image.trim()]
        : [];
      const cropData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        location: formData.location,
        district: formData.district,
        images: imagesArr,
        harvestDate: formData.harvestDate,
        status: 'available',
        owner: {
          uid: user?.uid || '',
          displayName: user?.displayName || '',
          email: user?.email || '',
          photoURL: user?.photoURL || '',
          phone: formData.ownerPhone,
        },
        interests: [],
      };

      const response = await cropsAPI.create(cropData);
      if (response && response.status === 201) {
        toast.success('Crop added successfully!');
        navigate('/my-posts');
      } else {
        toast.error('Failed to add crop. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || 'Failed to add crop');
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Add New Crop"
          subtitle="List your crop for potential buyers to discover"
        />

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Crop Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaSeedling className="inline mr-2 text-green-600" />
                  Crop Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., পেঁপে"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiClipboardList className="inline mr-2 text-green-600" />
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select category</option>
                  {cropTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL with Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <HiPhotograph className="inline mr-2 text-green-600" />
                Crop Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                    onError={() => setImagePreview('')}
                  />
                </div>
              )}
            </div>

            {/* Quantity, Unit & Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaWeight className="inline mr-2 text-green-600" />
                  Quantity *
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="pieces">pieces</option>
                  <option value="kg">kg</option>
                  <option value="maunds">maunds</option>
                  <option value="tons">tons</option>
                  <option value="liters">liters</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiCurrencyBangladeshi className="inline mr-2 text-green-600" />
                  Price per Unit (৳) *
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  placeholder="e.g., 40"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* Location, District & Harvest Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiLocationMarker className="inline mr-2 text-green-600" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., গাজীপুর, ঢাকা"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="e.g., Gazipur"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiCalendar className="inline mr-2 text-green-600" />
                  Harvest Date *
                </label>
                <input
                  type="date"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your crop - quality, farming methods, any special characteristics..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                required
              />
            </div>

            {/* Owner Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Listing as:</p>
              <div className="flex items-center gap-3 mb-2">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">{user?.displayName || 'User'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  placeholder="e.g., +8801712345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Adding Crop...' : 'Add Crop'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;
