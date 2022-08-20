import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedWrapper = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return isAuthenticated ? <>{children}</> : <Navigate to={'/'} />;
};

export default ProtectedWrapper;
