import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, getCarts } from '../redux/cartApi';
import { NavLink } from 'react-router-dom';

function Cart(props) {

    const { account } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const { listCarts } = useSelector(state => state.cartReducer);

    useEffect(() => {
        dispatch(getCarts(account.username));
    }, [])

    return (
        <section className="h-100 h-custom">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="h2">Shopping Cart</th>
                                        <th scope="col" className='text-center'>Quantity</th>
                                        <th scope="col" className='text-center'>Price</th>
                                        <th scope="col" className='text-center'>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listCarts ? listCarts.map(cart => (
                                        <tr key={cart.book.id}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={require(`../assets/images/${cart.book.imagePath}`)} className="img-fluid rounded-3"
                                                        style={{ width: '120px' }} alt="Book" />
                                                    <div className="flex-column ms-4 col-lg-8">
                                                        <NavLink style={{ textDecoration: 'none' }} to={`/book-detail/${cart.book.id}`}><h4 className="mb-2 text-black fs-5">{cart.book.title}</h4></NavLink>
                                                        <p className="mb-0 text-muted" >{cart.book.author}</p>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="align-middle text-center" style={{ fontWeight: 500 }}>
                                                <p className='mb-0'>{cart.quantity}</p>
                                            </td>
                                            <td className="align-middle col-lg-1 text-center">
                                                <p className="mb-0" style={{ fontWeight: 500 }}>
                                                    {`${(cart.book.price * cart.quantity).toLocaleString()} vnđ`}
                                                </p>
                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                                    <div onClick={() => dispatch(deleteCart({ username: account.username, cart }))} className="text-center" style={{ width: '100%' }}>
                                                        <i class="fa-regular fa-trash-can fa-lg trash-can-icon"></i>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : <h3>Loading...</h3>}
                                </tbody>
                            </table>
                        </div>

                        <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px', margin: '0 -8px' }}>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-8 col-xl-9">
                                        {/* Content on the left */}
                                    </div>
                                    <div className="col-lg-4 col-xl-3">
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                            <p className="mb-2">Subtotal</p>
                                            <p className="mb-2">{
                                                `${(listCarts.reduce((res, curr) => {
                                                    return res + curr.book.price * curr.quantity;
                                                }, 0)).toLocaleString()} vnđ`
                                            }</p>
                                        </div>

                                        <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                            <p className="mb-0">Shipping</p>
                                            <p className="mb-0">30,000 vnđ</p>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                                            <p className="mb-2">Total</p>
                                            <p className="mb-2">{`${(listCarts.reduce((res, curr) => {
                                                return res + curr.book.price * curr.quantity;
                                            }, 0) + 30000).toLocaleString()} vnđ`}</p>
                                        </div>

                                        <button type="button" className="btn btn-primary btn-block btn-lg">
                                            <div className="d-flex justify-content-between">
                                                {`${(listCarts.reduce((res, curr) => {
                                                    return res + curr.book.price * curr.quantity;
                                                }, 0) + 30000).toLocaleString()} vnđ`}
                                            </div>
                                        </button>
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

export default Cart;