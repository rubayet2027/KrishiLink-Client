import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiShieldCheck, HiUsers, HiCurrencyBangladeshi, HiTrendingUp } from 'react-icons/hi';
import { FaSeedling, FaTractor, FaHandshake, FaLeaf } from 'react-icons/fa';
import CropCard from '../components/crops/CropCard';
import SectionTitle from '../components/ui/SectionTitle';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { cropsAPI } from '../services/api';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();
  const [featuredCrops, setFeaturedCrops] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchFeaturedCrops = async () => {
    try {
      const response = await cropsAPI.getAll({ limit: 6 });
      const crops = response?.data?.data;
      setFeaturedCrops(Array.isArray(crops) ? crops : []);
    } catch (error) {
      console.error('Error fetching featured crops:', error);
      setFeaturedCrops([]);
    } finally {
      setLoading(false);
    }
  };

  fetchFeaturedCrops();
}, []);


  const features = [
    {
      icon: FaHandshake,
      title: 'Direct Connection',
      description: 'Connect directly with farmers and buyers without intermediaries'
    },
    {
      icon: HiShieldCheck,
      title: 'Verified Listings',
      description: 'All crop listings are verified for authenticity and quality'
    },
    {
      icon: HiCurrencyBangladeshi,
      title: 'Fair Prices',
      description: 'Get fair market prices with transparent pricing information'
    },
    {
      icon: HiTrendingUp,
      title: 'Growth Support',
      description: 'Access resources and support to grow your farming business'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Farmers' },
    { value: '50K+', label: 'Crops Listed' },
    { value: '25K+', label: 'Successful Deals' },
    { value: '100+', label: 'Districts Covered' }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="gradient-hero min-h-150 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <FaSeedling />
                Empowering Farmers Across Bangladesh
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connect, Grow & 
                <span className="text-green-600"> Prosper</span> Together
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                KrishiLink bridges the gap between farmers and buyers. List your crops, 
                find the best deals, and grow your agricultural business with our trusted platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/crops"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Crops
                  <HiArrowRight />
                </Link>
                <Link
                  to="/add-crop"
                  className="inline-flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  <FaLeaf />
                  List Your Crop
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=500&fit=crop"
                alt="Farmer in field"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaTractor className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Join Today</p>
                    <p className="text-sm text-gray-500">Free Registration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-600 py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl md:text-6xl font-bold text-white mb-3">{stat.value}</p>
                <p className="text-green-100 text-lg font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose KrishiLink?"
            subtitle="We provide the best platform for farmers and buyers to connect and grow together"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:bg-green-50 transition-colors group"
              >
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <feature.icon className="text-2xl text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Crops Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Featured Crops"
            subtitle="Discover fresh crops from farmers near you"
          />
          
          {loading ? (
            <LoadingSpinner fullScreen={false} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCrops.map((crop) => (
                  <CropCard key={crop._id} crop={crop} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link
                  to="/crops"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  View All Crops
                  <HiArrowRight />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section - Only show when user is not logged in */}
      {!user && (
        <section className="py-20 bg-linear-to-r from-green-600 to-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already growing their business with KrishiLink. 
              Register today and start connecting with buyers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <HiUsers />
                Register Now
              </Link>
              <Link
                to="/crops"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Browse Crops
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
