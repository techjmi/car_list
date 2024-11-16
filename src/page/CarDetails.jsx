import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetails } from '../service/api';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null); // Store car details in state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetchDetails(id);
        setCar(response);
        setLoading(false);
      } catch (err) {
        setError('Error fetching car details');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mb-1 md:mb-3">
      {car && (
        <div className="mx-1 md:mx-4">
          <h2 className="text-3xl font-bold mb-4 mx-2">{car.title}</h2>
          <p className="text-xl text-gray-700">{car.car_type}</p>

          <div className="mt-4 mx-2">
            <p className="font-semibold text-lg">Description:</p>
            <p className="text-gray-800">{car.description}</p>
          </div>

          <div className="mt-4 mx-2">
            <p className="font-semibold text-lg">Tags:</p>
            <ul className="list-disc pl-6 text-gray-800">
              {Object.keys(car.tags).map((key, index) => (
                <li key={index}>
                  <span className="font-medium">{key}</span>: {car.tags[key]}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-lg">Images:</p>
            <div className="overflow-x-auto mt-2 container">
              <div className="flex md:space-x-4 space-x-2">
                {car.images && car.images.slice(0, 10).map((image, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={image}
                      alt={`Car Image ${index + 1}`}
                      className="w-60 h-40 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
