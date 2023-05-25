import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/images/background.jpg'
import { login } from '../redux/loginApi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);

    const { isLoggedIn, loginMsg } = useSelector(state => state.authReducer);

    const [isEditable, setIsEditable] = useState(!isLoggedIn);

    const dispatch = useDispatch()

    const myStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
    };

    const handleLogin = () => {
        if (!isLoggedIn)
            dispatch(login({ username, password }))
    }

    useEffect(() => {
        setIsEditable(!isLoggedIn);
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <div style={myStyle}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section pt-5" style={{ color: 'red' }}>BOOK LIBRARY</h2>
                    </div>
                    <div>
                        <h3 className='text-center' style={{ color: 'red' }}>{loginMsg}</h3>
                    </div>
                </div>
                <div className="row justify-content-center form-group">
                    <div className="col-md-6 col-lg-4 form-group">
                        <div className="login-wrap p-0 form-group">
                            <h3 className="mb-2 text-center form-group pb-3" style={{ fontSize: '20px', color: 'white' }}>Already have an account?</h3>
                            <div className='form-group'>
                                <div className='pb-2'>
                                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" className="form-control" placeholder="Username" required disabled={!isEditable} />
                                </div>
                                <div className='pb-2'>
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" placeholder="Password" required disabled={!isEditable} />
                                </div>
                                <div className='pb-2'>
                                    <button onClick={handleLogin} className="form-control btn btn-primary submit">Sign In</button>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="flexCheckDefault" style={{ color: 'white' }}>
                                            Remember me
                                        </label>
                                        <input className="form-check-input" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} disabled={!isEditable} />
                                    </div>
                                    <div disabled={!isEditable}><NavLink to="/register" style={{ color: "#fff", textDecoration: 'none' }} >Register</NavLink></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;