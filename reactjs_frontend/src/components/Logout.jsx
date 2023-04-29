import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../service/AuthenticationService';
import { logout } from '../redux/authSlice';

function Logout(props) {

    const { logoutMsg, isLoggedIn } = useSelector(state => state.authReducer)

    const dispatch = useDispatch()

    const clearToken = () => {
        dispatch(logout());
        authService.clearSession();
    }

    return (
        <>
            {!isLoggedIn ? <h1>{logoutMsg}</h1>
                : <form className='form-control container' action='http://localhost:8080/api/auth/logout' onSubmit={clearToken}>
                    <div><h2>Are you want to log out ?</h2></div>
                    <div><button className='btn btn-primary' type='submit'>Logout</button></div>
                </form>
            }
        </>
    );
}

export default Logout;