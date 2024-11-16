import axios from 'axios';
const url_user = 'https://car-backend-bm7z.onrender.com/api'; 
// const url_user='http://localhost:5000/api' 
const url = 'https://car-backend-bm7z.onrender.com/car';
// const url = 'http://localhost:5000/car';   
// User signup
export const SignUp = async (data) => {
  try {
    const response = await axios.post(`${url_user}/signup`, data);
    return response;
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};

// Fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${url_user}/me`, {
      withCredentials: true,
      credentials: 'include',
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// User signin
export const signIn = async (data) => {
  try {
    const response = await axios.post(`${url_user}/signin`, data,{
      credentials: 'include',
      withCredentials: true 
    });
    return response;
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};

// User logout
export const Logout = async () => {
  try {
    const response = await axios.post(`${url_user}/logout`, null, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Post a new car
export const postCar = async (data) => {
  try {
    const response = await axios.post(`${url}/create`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};

// Fetch list of all cars
export const fetchCar = async () => {
  try {
    const response = await axios.get(`${url}/car_list`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching the cars:", error.message);
  }
};

// Fetch details of a single car
export const fetchDetails = async (id) => {
  try {
    const response = await axios.get(`${url}/car-details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching the car details:", error.message);
  }
};

// Fetch user's own cars
export const fetchUserCars = async () => {
  try {
    const response = await axios.get(`${url}/user_car_list`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('Unable to fetch cars');
  }
};

// Delete a specific car
export const deleteCar = async (carId) => {
  try {
    const response = await axios.delete(`${url}/delete/${carId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw new Error('Failed to delete car');
  }
};

// Edit a specific car's details
export const EditCarAPI = async (data, id) => {
  try {
    const response = await axios.put(`${url}/edit/${id}`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};
