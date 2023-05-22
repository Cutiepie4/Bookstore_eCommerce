import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findBookById } from '../redux/api';

function BookDetail(props) {

    const { id } = useParams();

    const [book, setBook] = useState({});

    useEffect(() => {
        const findBook = async () => {
            try {
                const bookData = await findBookById(id);
                setBook(bookData);
            } catch (error) {
                console.log(error);
            }
        };
        findBook();
    }, [id])

    return (
        <div className='container card' style={{ maxWidth: '1000px', backgroundColor: '#faf9ba' }}>
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-4"><img className="card-img-top mb-5 mb-md-0" src={book.imagePath && require(`../assets/images/${book.imagePath}`)} alt="book-cover" /></div>
                        <div className="col-md-8">
                            <h1 className="display-6 mb-2 fw-bolder" style={{ margin: '0 0' }}>{book.title}</h1>
                            <h3 className="fs-6 mb-5 fw-light">by {book.author}</h3>
                            <p className="lead fs-6" style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {book.description}
                            </p>
                            <div className="fs-5 mb-2">
                                <span className="text-decoration-line-through"></span>
                                <span>{book.price && book.price.toLocaleString() + ' vnđ'} </span>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BookDetail;