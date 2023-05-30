import React, { useEffect, useState } from 'react';
import { login } from '../redux/loginApi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { isLoggedIn } = useSelector(state => state.authReducer);
    const [isEditable, setIsEditable] = useState(!isLoggedIn);

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
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex py-5 h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login to BookStore</p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" placeholder='Your Username' value={username} onChange={e => setUsername(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between mb-5 align-items-center">
                                                <div className='d-flex justify-content-between form-check'>
                                                    <input className="form-check-input mx-2" type="checkbox" value="" id="form2Example3c" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                                                    <label className="form-check-label" htmlFor="form2Example3c">
                                                        Remember me
                                                    </label>
                                                </div>
                                                <NavLink className='btn btn-outline-dark' to={'/register'}>Register</NavLink>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={!isEditable}>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;