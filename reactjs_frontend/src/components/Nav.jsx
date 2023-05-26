import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

function Nav() {

    const { isLoggedIn, role, account } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    return (
        <>
            <div className="header">
                <div className="browse">
                    <NavLink style={{ textDecoration: 'none', color: '#8b939c' }} to={'/'}><div className="header-title">book<span>store</span></div></NavLink>
                    <div className="search-bar">
                        <input type="text" placeholder="Search Book" />
                    </div>
                </div>

                <div className="profile">
                    {/* <div className='notification-icon'>1</div> */}
                    <NavLink style={{ textDecoration: 'none', color: '#8b939c' }} to={'/cart'}>
                        <div className="user-profile pe-3">
                            <i className="fa-solid fa-cart-shopping fa-lg pe-2"></i>
                            Cart
                        </div>
                    </NavLink>
                    <div className="profile-menu">
                        <i className="fa-solid fa-user fa-lg p-2"></i>
                        {account ? account.username : 'Login'}
                        <ul className="dropdown">
                            {isLoggedIn ? (<li className='border-bottom'><NavLink>Manage user</NavLink></li>) : (<li><NavLink to="/login">Login</NavLink></li>)}
                            {role == 'ADMIN' && (<li className='border-bottom'><NavLink to='/books'>Manage storage</NavLink></li>)}
                            {isLoggedIn && (<li className='border-bottom' onClick={() => dispatch(logout())}><a href='http://localhost:8080/api/auth/logout'>Logout</a></li>)}
                        </ul>
                    </div>
                </div>
            </div >

            <Outlet />
        </>
    );
}

export default Nav;