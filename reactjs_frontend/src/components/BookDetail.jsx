import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findBookById } from '../redux/bookApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/cartApi';
import { deleteComment, fetchComments, postComment } from '../redux/commentApi';

function BookDetail(props) {

    const { username, isLoggedIn, role } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const { id } = useParams();

    const [expanded, setExpanded] = useState(false);

    const [cart, setCart] = useState({ quantity: 1, book: {} });

    const navigate = useNavigate();

    const [listComments, setListCommments] = useState([]);

    const [currentComment, setCurrentComment] = useState('');

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric"
        });
    }

    useEffect(() => {
        const findBook = async () => {
            const bookData = await findBookById(id);
            setCart({ ...cart, book: bookData });
        };
        findBook();

        const fetchListComments = async () => {
            const commentData = await fetchComments(id);
            setListCommments(commentData);
        }
        fetchListComments();
    }, [])

    const handlePost = async () => {
        const newComment = await postComment(username, cart.book.id, currentComment);
        setListCommments([...listComments, newComment]);
        setCurrentComment('');
    }

    const handleDelete = (id) => {
        deleteComment(id).then(res => setListCommments(listComments.filter(item => item.id !== id)));
    }

    return (
        <>
            <div className='container card col-md-12 col-lg-10' style={{ backgroundColor: '#faf9ba' }}>
                <div className="container px-4 px-lg-5 my-5 ">
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
                                <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={() => { isLoggedIn ? dispatch(addCart({ cart, username })) : navigate('/login') }}>
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section >
                <div className="container my-5 py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="card text-dark">
                                <div className="card-body p-4 pb-0">
                                    <h4 className="mb-0">Recent comments</h4>
                                    <p className="fw-light mb-4">Latest Comments section by users</p>
                                </div>

                                {listComments.length !== 0 ? listComments.map(comment => comment && (
                                    <div key={comment.id}>
                                        <div className="card-body p-4" >
                                            <div className="d-flex flex-start">
                                                <img className="rounded-circle shadow-1-strong me-3"
                                                    src={require(`../assets/images/avt.webp`)} alt="avatar" width="60"
                                                    height="60" />
                                                <div>
                                                    <h6 className="fw-bold mb-1">{comment.user.username}</h6>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <p className="mb-0">
                                                            {formatDate(comment.date)}
                                                        </p>
                                                        {isLoggedIn && (role === 'ADMIN' || username === comment.user.username) && <div className="link-muted" onClick={() => handleDelete(comment.id)}>
                                                            <i className="fa-solid fa-trash fa-sm cart-quantity ms-2"></i>
                                                        </div>}
                                                    </div>
                                                    <p className="mb-0">
                                                        {comment.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div >
                                        <hr className="my-0" />
                                    </div>
                                )) : <h5 className='p-4'>Be the first comment here.</h5>}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section>
                <div className="container my-5 py-5 text-dark">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex flex-start w-100">
                                        <div className="w-100">
                                            {isLoggedIn ? (<>
                                                <h5>You can post your comment here</h5>
                                                <div className="align-items-center justify-content-center">
                                                    Rating here
                                                    <fieldset className="ms-2 rating book-rate" >
                                                        <input type="checkbox" id="star-c1" name="rating" value="5" />
                                                        <label className="full" htmlFor="star-c1"></label>
                                                        <input type="checkbox" id="star-c2" name="rating" value="4" />
                                                        <label className="full" htmlFor="star-c2"></label>
                                                        <input type="checkbox" id="star-c3" name="rating" value="3" />
                                                        <label className="full" htmlFor="star-c3"></label>
                                                        <input type="checkbox" id="star-c4" name="rating" value="2" />
                                                        <label className="full" htmlFor="star-c4"></label>
                                                        <input type="checkbox" id="star-c5" name="rating" value="1" />
                                                        <label className="full" htmlFor="star-c5"></label>
                                                    </fieldset>
                                                    <span className="book-voters card-vote"></span>
                                                </div>
                                                <div className="form-outline">
                                                    <label className="form-label my-3" htmlFor="textAreaExample">What is your opinion?</label>
                                                    <textarea className="form-control" id="textAreaExample" rows="4" value={currentComment} onChange={e => setCurrentComment(e.target.value)}></textarea>
                                                </div>
                                                <div className="d-flex float-end mt-3">
                                                    <button type="button" className="btn btn-success" onClick={handlePost}>
                                                        Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
                                                    </button>
                                                </div>
                                            </>) : <h4>Please login to comment.</h4>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BookDetail;