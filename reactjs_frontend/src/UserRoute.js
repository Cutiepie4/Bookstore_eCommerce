import React from 'react';

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function UserRoute(props) {

    const { isLoggedIn, role } = useSelector(state => state.authReducer);

    if (!isLoggedIn || role == 'GUEST') {
        return <Navigate to="/login" replace />;
    }

    if (role == 'ADMIN') {
        return <Navigate to={'/'} replace />;
    }

    return <Outlet />;
}

export default UserRoute;