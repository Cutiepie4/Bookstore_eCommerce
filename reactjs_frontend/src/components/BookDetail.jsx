import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findBookById } from '../redux/bookApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/cartApi';

function BookDetail(props) {

    const { account } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const { id } = useParams();

    const [expanded, setExpanded] = useState(false);

    const [cart, setCart] = useState({ quantity: 1, book: {} });

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        const findBook = async () => {
            try {
                const bookData = await findBookById(id);
                setCart({ ...cart, book: bookData });
            } catch (error) {
                toast.error(error.message);
            }
        };
        findBook();
    }, [id])

    return (
        <div className='container card' style={{ maxWidth: '1000px', backgroundColor: '#faf9ba' }}>
            <section className="">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-4 align-self-start" ><img className="card-img-top mb-5 mb-md-0" src={cart.book.imagePath && require(`../assets/images/${cart.book.imagePath}`)} alt="book-cover" /></div>
                        <div className="col-md-8">
                            <h1 className="display-6 mb-3 fw-bolder" style={{ margin: '0 0' }}>{cart.book.title}</h1>
                            <h3 className="fs-6 mb-5 fw-normal">by {cart.book.author}</h3>
                            <p id='description' className={`lead fs-6 ${expanded ? 'expanded' : ''} mb-5`} onClick={toggleExpanded}>
                                {cart.book.description}
                            </p>
                            <div className="fs-4 mb-3">
                                <span className="text-decoration-line-through"></span>
                                <span style={{ color: 'red' }}>{cart.book.price && cart.book.price.toLocaleString() + ' vnđ'} </span>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <i className="fa-solid fa-minus me-2 cart-quantity" onClick={() => { cart.quantity > 1 && setCart({ ...cart, quantity: cart.quantity - 1 }) }}></i>
                                <div className='btn btn-outline-dark me-2 flex-shrink-0' style={{ minWidth: '40px' }} >
                                    {cart.quantity}
                                </div>
                                <i className="fa-solid fa-plus cart-quantity" onClick={() => { setCart({ ...cart, quantity: cart.quantity + 1 }) }}></i>
                            </div>
                            <div className='d-flex'>
                                <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={() => dispatch(addCart({ cart, username: account.username }))}>
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default BookDetail;