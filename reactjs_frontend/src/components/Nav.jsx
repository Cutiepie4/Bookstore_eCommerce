import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';


function Nav() {

    const { role } = useSelector(state => state.authReducer);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink className="navbar-brand">{role}</NavLink>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink className="nav-link navbar-nav" to="/books">Library </NavLink>
                        <NavLink className="nav-link navbar-nav" to="/login">Login</NavLink>
                        <NavLink className="nav-link navbar-nav" to="/logout">Logout</NavLink>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}

export default Nav;