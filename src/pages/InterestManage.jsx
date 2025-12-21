import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import InterestTable from '../components/crops/InterestTable';
import { interestsAPI } from '../services/api';


const InterestManage = () => {
  const { id } = useParams();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


		const fetchInterests = useCallback(async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await interestsAPI.getByCrop(id);
				setInterests(response.data?.data || []);
			} catch {
				setError('Failed to load interests.');
			} finally {
				setLoading(false);
			}
		}, [id]);

	useEffect(() => {
		fetchInterests();
	}, [fetchInterests]);

	if (loading) return <div className="p-8 text-center">Loading...</div>;
	if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4">Manage Interests</h2>
			<InterestTable
				interests={interests.map(i => ({ ...i, cropId: id }))}
				onStatusUpdate={fetchInterests}
			/>
		</div>
	);
};

export default InterestManage;
