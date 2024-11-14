import React, { useState } from 'react';
import Carform from '../components/Carform';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import { postCar } from '../service/api';

const AddCar = () => {
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: {
      car_type: '',
      company: '',
      dealer: '',
    },
    images: [],
  });
  
  const navigate = useNavigate();  // Hook to redirect after form submission

  const handleCarSubmit = async (newCarData) => {
    try {
      const response = await postCar(newCarData);
      console.log('Car created:', response);

      if (response.status === 201) {
        // Clear the form data after successful submission
        setCarData({
          title: '',
          description: '',
          tags: {
            car_type: '',
            company: '',
            dealer: '',
          },
          images: [],
        });

        // Redirect to the homepage after successful form submission
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div>
      <Carform onSubmit={handleCarSubmit} carData={carData} setCarData={setCarData} />
    </div>
  );
};

export default AddCar;
