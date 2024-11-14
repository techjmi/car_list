import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

const isLoggedIn = () => {
  return !!localStorage.getItem("token"); // Should return true if token is present
};

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

