import axios from 'axios';

const url = 'https://car-backend-bm7z.onrender.com/car';  // Base URL for car-related routes
const url_user = 'https://car-backend-bm7z.onrender.com/api';  // Base URL for user-related routes

// User signup
export const SignUp = async (data) => {
  try {
    const response = await axios.post(`${url_user}/signup`, data);
    // console.log(response.data);
    return response;  // Return response for further handling
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};

// Fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${url_user}/me`, { withCredentials: true });
    // console.log('fetch user', response.data);
    return response.data;  // Return user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;  // Throw error for further handling
  }
};

// User signin
export const signIn = async (data) => {
  try {
    const response = await axios.post(`${url_user}/signin`, data, { withCredentials: true });
    // console.log(response.data);
    return response;  // Return response for further handling
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};

// User logout
export const Logout = async () => {
  try {
    const response = await axios.post(`${url_user}/logout`, {}, { withCredentials: true });
    return response;  // Return response if successful
  } catch (error) {
    console.error('Logout error:', error);
    throw error;  // Throw error for further handling
  }
};

// Post a new car
export const postCar = async (data) => {
  try {
    const response = await axios.post(`${url}/create`, data, { withCredentials: true });
    // console.log(response.data);
    return response;  // Return response for further handling
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};

// Fetch list of all cars
export const fetchCar = async () => {
  try {
    const response = await axios.get(`${url}/car_list`);
    // console.log(response.data);
    return response.data;  // Return list of cars
  } catch (error) {
    console.error("Error while fetching the cars:", error.message);
  }
};

// Fetch details of a single car
export const fetchDetails = async (id) => {
  try {
    const response = await axios.get(`${url}/car-details/${id}`);
    // console.log(response.data);
    return response.data;  // Return car details
  } catch (error) {
    console.error("Error while fetching the car details:", error.message);
  }
};

// Fetch user's own cars
export const fetchUserCars = async () => {
  try {
    const response = await axios.get(`${url}/user_car_list`, { withCredentials: true });
    // console.log('the car data of user is', response);
    return response.data;  // Return user's cars
  } catch (error) {
    throw new Error('Unable to fetch cars');
  }
};

// Delete a specific car
export const deleteCar = async (carId) => {
  try {
    const response = await axios.delete(`${url}/delete/${carId}`, { withCredentials: true });
    return response.data;  // Return response for further handling
  } catch (error) {
    console.error('Error deleting car:', error);
    throw new Error('Failed to delete car');
  }
};

// Edit a specific car's details
export const EditCarAPI = async (data, id) => {
  try {
    const response = await axios.put(`${url}/edit/${id}`, data, { withCredentials: true });
    // console.log(response.data);
    return response;  // Return response for further handling
  } catch (error) {
    console.error("Error while posting the data:", error.message);
  }
};
