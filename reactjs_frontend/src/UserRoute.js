import React from 'react';

import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

function UserRoute(props) {

    const navigate = useNavigate();

    const { isLoggedIn, role } = useSelector(state => state.authReducer);

    if (!isLoggedIn || role !== 'USER') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default UserRoute;