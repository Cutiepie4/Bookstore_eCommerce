import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../redux/loginApi';
import { NavLink } from 'react-router-dom';

function Register(props) {

    const dispatch = useDispatch();

    const [account, setAccount] = useState({});

    const [alterPassword, setAlterPassword] = useState('');

    const [agree, setAgree] = useState(false);

    const validate = () => {
        if (!agree) {
            toast.error('Please check the Term of Services');
            return false;
        }
        if (alterPassword !== account.password) {
            toast.error('Wrong confirm password!');
            return false;
        }
        return true;
    }

    const handleRegister = (e) => {
        if (validate()) {
            dispatch(register(account));
        }
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex py-5 h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" placeholder='Your Username' value={account.username} onChange={e => setAccount({ ...account, username: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" className="form-control" placeholder='Your Email' value={account.email} onChange={e => setAccount({ ...account, email: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control" placeholder='Password' value={account.password} onChange={e => setAccount({ ...account, password: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" placeholder='Repeat your password' value={alterPassword} onChange={e => setAlterPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" checked={agree} onChange={e => setAgree(e.target.checked)} />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-success me-4" onClick={handleRegister}>Register</button>
                                                <NavLink to={'/login'}>
                                                    <button className="btn btn-outline-dark">Return to login page</button>
                                                </NavLink>
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

export default Register;