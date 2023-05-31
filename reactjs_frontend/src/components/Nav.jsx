import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { getCarts } from '../redux/cartApi';
import { fetchBooks } from '../redux/bookApi';

function Nav() {

    const dispatch = useDispatch();
    const { isLoggedIn, role, username } = useSelector(state => state.authReducer);
    const { cartsCount } = useSelector(state => state.cartReducer);
    const { listBooks } = useSelector(state => state.bookReducer);
    const [count, setCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [filteredBook, setFilteredBook] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        dispatch(fetchBooks());
        if (isLoggedIn && username) {
            dispatch(getCarts(username));
        }
    }, [])

    useEffect(() => {
        setCount(cartsCount);
    }, [cartsCount]);

    useEffect(() => {
        if (keyword.trim.length == 0) {
            setFilteredBook([]);
        }
        if (listBooks && keyword.trim().length > 0) {
            setFilteredBook(listBooks.filter(book => book.title.toLowerCase().includes(keyword.toLowerCase())));
        }
    }, [keyword])

    return (
        <>
            <div className="header">
                <div className="browse">
                    <NavLink style={{ textDecoration: 'none', color: '#8b939c' }} to={'/'}><div className="header-title">book<span>store</span></div></NavLink>
                    <div className="search-bar">
                        <div className='d-flex align-items-center'>
                            <input type="text" placeholder="Search Book" value={keyword} onChange={e => setKeyword(e.target.value)} onFocus={() => setIsFocused(true)} />
                            <i className="fa-solid fa-xmark fa-xs hover-red" onClick={() => setKeyword('')}></i>
                        </div>
                        {filteredBook.length > 0 && isFocused ?
                            <div className="dropdown card" >
                                {filteredBook.map(book => (
                                    <NavLink key={book.id} className={'text-muted'} to={`/book-detail/${book.id}`} style={{ textDecoration: 'none' }}>
                                        <div className='result-item' onClick={() => { setIsFocused(false) }}>
                                            {book.title}
                                        </div>
                                    </NavLink>))
                                }
                            </div>
                            : keyword.length > 0 && isFocused &&
                            <div className='dropdown'>
                                <div className="result-item">No matching found.</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="profile">
                    {count > 0 && <div className='notification-icon'>{count}</div>}
                    <NavLink style={{ textDecoration: 'none', color: '#8b939c' }} to={'/cart'}>
                        <div className="user-profile pe-3">
                            <i className="fa-solid fa-cart-shopping fa-lg pe-2"></i>
                            Cart
                        </div>
                    </NavLink>
                    <div className="profile-menu">
                        <i className="fa-solid fa-user fa-lg p-2"></i>
                        {username ? username : 'Login'}
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