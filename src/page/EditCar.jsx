import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditCarAPI, fetchDetails } from '../service/api';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    title: '',
    description: '',
    tags: {
      car_type: '',
      company: '',
      dealer: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetchDetails(id);
        console.log('edit car details', response);
        setCar(response);
      } catch (err) {
        setError('Failed to fetch car details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      tags: {
        ...prevCar.tags,
        [name]: value, // Update the specific tag field
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await EditCarAPI(car, id); 
    //   alert('Car updated successfully');
      navigate('/');
    } catch (err) {
      setError('Failed to update car.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Edit Car</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={car.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={car.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="4"
            required
          />
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="car_type">
            Car Type
          </label>
          <input
            type="text"
            id="car_type"
            name="car_type"
            value={car.tags.car_type}
            onChange={handleTagChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Sedan"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={car.tags.company}
            onChange={handleTagChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Toyota"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="dealer">
            Dealer
          </label>
          <input
            type="text"
            id="dealer"
            name="dealer"
            value={car.tags.dealer}
            onChange={handleTagChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., ABC Motors"
          />
        </div>

        {/* Image field is not included as per your requirement */}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Update Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
