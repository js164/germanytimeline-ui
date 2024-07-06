import React from "react";
import { Navigate  } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
    return children;
  }
  return <Navigate to="/login" />;
};



export const UnProtectedRoute = ({ children }) => {
  if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
    return <Navigate to="/" />;
  }
  return children;
};

