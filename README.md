
# Car Management Application

This project is a Car Management Application built with the **MERN stack (MongoDB, Express, React, Node.js)** and **JWT Authentication**. The application allows users to manage cars, including adding, editing, deleting, and viewing cars. Users can only manage their own cars after logging in. The project also uses **Firebase** for image storage and **Tailwind CSS** for styling.

## Features

- **User Authentication**: Users can sign up, log in, and log out using JWT for secure authentication.
- **Car Management**: Users can add, edit, and delete their own cars.
- **Responsive Design**: The frontend is fully responsive and uses Tailwind CSS for styling.
- **Image Storage**: Images are uploaded to Firebase Storage and stored in the backend as URLs.
- **APIs**: All backend operations (user authentication and car management) are exposed through RESTful APIs.
- **Postman Testing**: All APIs have been tested in Postman to ensure proper functionality.

## Technologies Used

- **Backend**: Node.js, Express, JWT, Firebase
- **Frontend**: React, Tailwind CSS
- **Database**: MongoDB (hosted on Render)
- **Image Storage**: Firebase Storage
- **Deployment**: Backend and frontend are deployed separately on Render

## Backend URL

The backend for this project is deployed on Render and can be accessed at the following URL:

- [Backend API](https://car-backend-bm7z.onrender.com)

## Frontend URL

The frontend is also deployed separately on Render and can be accessed at the following URL:

- [Car Management App](https://car-list-j0gy.onrender.com/)

## API Documentation

### 1. **User Authentication APIs**

- **POST /api/signup**  
  Create a new user.
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response**: Success message or error.

- **POST /api/signin**  
  Login to an existing user account.
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response**:  
    ```json
    {
      "token": "jwt-token"
    }
    ```

- **POST /api/logout**  
  Log out the current user by invalidating the JWT token.
  - **Response**: Success message.

### 2. **Car Management APIs**

- **POST /car/create**  
  Add a new car (requires authentication).
  - **Headers**: 
    - `Authorization: Bearer <JWT_TOKEN>`
  - **Request Body**: 
    ```json
    {
      "title": "Car Title",
      "description": "Car Description",
      "images": ["image-url-1", "image-url-2"],
      "tags": {
        "car_type": "SUV",
        "company": "Toyota",
        "dealer": "Local Dealer"
      }
    }
    ```
  - **Response**: Success message or error.

- **GET /car/user-car-list**  
  Get all cars created by the authenticated user (requires authentication).
  - **Headers**: 
    - `Authorization: Bearer <JWT_TOKEN>`
  - **Response**: List of cars created by the user.

- **GET /car/car-list**  
  Get a list of all available cars (no token required).
  - **Response**: List of all cars.

- **GET /car/car-details/{id}**  
  View details of a specific car by its ID (no token required).
  - **Response**: Car details object.

- **GET /car/edit/{id}**  
  Edit car details (requires authentication).
  - **Headers**: 
    - `Authorization: Bearer <JWT_TOKEN>`
  - **Request Body**: (Similar to the `create` API)
  - **Response**: Updated car details.

- **DELETE /car/delete/{id}**  
  Delete a specific car by its ID (requires authentication).
  - **Headers**: 
    - `Authorization: Bearer <JWT_TOKEN>`
  - **Response**: Success message or error.

## Frontend Overview

The frontend is a React-based application that communicates with the backend to display and manage cars. Key pages include:

- **Car List**: A public page where all cars are listed.
- **Car Details**: View detailed information about a specific car.
- **Add Car**: A form to add a new car (only accessible to authenticated users).
- **User's Car List**: A page that shows only the cars created by the logged-in user.
- **Edit Car**: Edit the details of a car created by the logged-in user.
  
## Environment Variables

You will need the following environment variables for the backend:

- **JWT_SECRET**: Secret key for signing JWT tokens.
- **FIREBASE_BUCKET_URL**: Firebase storage URL for image uploads.
- **MONGODB_URI**: MongoDB connection string.
  
Make sure to configure these in your deployment settings on Render.

## Testing the APIs with Postman

To test the API endpoints, use the following steps:

1. **Sign Up**: Send a `POST` request to `/api/signup` with user credentials.
2. **Sign In**: Send a `POST` request to `/api/signin` to get the JWT token.
3. **Authenticated Requests**: Use the `Authorization: Bearer <JWT_TOKEN>` header for requests that require authentication (like creating, editing, or deleting cars).
4. **Public Access**: Endpoints like `/car/car-list` and `/car/car-details/{id}` can be accessed without authentication.

### Example Request: Add a New Car

```bash
POST /car/create
Authorization: Bearer <JWT_TOKEN>
{
  "title": "New Car",
  "description": "This is a description of the new car.",
  "images": ["https://image-url.com"],
  "tags": {
    "car_type": "Sedan",
    "company": "Honda",
    "dealer": "Authorized Dealer"
  }
}
```

### Example Response:

```json
{
  "message": "Car added successfully",
  "car": {
    "_id": "12345",
    "title": "New Car",
    "description": "This is a description of the new car.",
    "images": ["https://image-url.com"],
    "tags": {
      "car_type": "Sedan",
      "company": "Honda",
      "dealer": "Authorized Dealer"
    }
  }
}
```

## My Portfolio

You can view my portfolio here:  
- [Md Shamim Akhter - Portfolio](https://shamim-portfolio-u1yp.onrender.com/)

The portfolio is fully responsive and showcases my skills, projects, and professional experience.




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
