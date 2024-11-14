import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserCars, deleteCar } from '../service/api'; // Ensure deleteCar function is available

const UserCars = () => {
  const [userCars, setUserCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user cars when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await fetchUserCars();
        setUserCars(cars);
      } catch (err) {
        setError('Failed to load cars.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (carId) => {
    try {
      await deleteCar(carId);
      setUserCars(userCars.filter(car => car._id !== carId));
    } catch (err) {
      setError('Failed to delete car.');
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Your Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {userCars.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-600">No cars added yet.</p>
        ) : (
          userCars.map((car) => (
            <div key={car._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={car.images[0] || 'https://via.placeholder.com/500'}
                alt={car.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{car.title}</h3>
                <p className="text-gray-600 mt-2">{car.description.length > 30 ? `${car.description.slice(0, 50)}...` : car.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/car-details/${car._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </Link>
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-car/${car._id}`}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserCars;
