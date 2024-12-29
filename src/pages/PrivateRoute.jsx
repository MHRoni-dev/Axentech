import { userContext } from '@/context/userContext';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const {token, loading } = useContext(userContext);


  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
