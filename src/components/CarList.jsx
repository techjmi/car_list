import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCar } from '../service/api';
import { DataContext } from '../context/DataProvider';

const CarList = () => {
  const { cars, setCars } = useContext(DataContext);

  useEffect(() => {
    const getCars = async () => {
      const carData = await fetchCar();
      if (carData) {
        setCars(carData);
      }
    };

    getCars();
  }, []);

  return (
    <div className="mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Car List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {cars && cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className="p-4 border rounded shadow-md">
              {car.images && car.images.length > 0 && (
                <img
                  src={car.images[0]}
                  alt="Car"
                  className="w-full h-48 object-cover rounded-t"
                />
              )}
              <h2 className="text-xl font-semibold mt-4 truncate">
                {car.title.slice(0, 20)}{car.title.length > 20 && '...'}
              </h2>
              <p className="text-gray-700 truncate">
                {car.description.slice(0, 20)}{car.description.length > 20 && '...'}
              </p>
              <div className="flex mt-2">
                <p className="font-medium text-sm mr-4 truncate">
                  {car.tags.car_type.slice(0, 20)}{car.tags.car_type.length > 20 && '...'}
                </p>
                <p className="font-medium text-sm truncate">
                  {car.tags.company.slice(0, 20)}{car.tags.company.length > 20 && '...'}
                </p>
              </div>
              <div className="mt-4">
                <Link to={`/car-details/${car._id}`} className="text-blue-500 underline hover:text-blue-700">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
