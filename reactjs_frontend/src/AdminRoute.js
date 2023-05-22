import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute() {

    const { isLoggedIn, role } = useSelector(state => state.authReducer);

    if (!isLoggedIn || role !== 'ADMIN') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;