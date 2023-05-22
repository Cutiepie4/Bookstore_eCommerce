import React, { useEffect, useState } from 'react';
import '../styles/test.scss'
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/api';

function Home(props) {

    const dispatch = useDispatch();

    const { isLoading, listBooks } = useSelector(state => state.bookReducer);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [])

    return (
        <>
            <div className="main-wrapper">
                <div className="books-of">
                    <div className="week year">
                        <div className="author-title">Best Sellers</div>
                        <div className="year-book">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/A1kNdYXw0GL.jpg" alt="" className="year-book-img" />
                            <div className="year-book-content">
                                <div className="year-book-name">Disappearing Earth</div>
                                <div className="year-book-author">by Julia Phillips</div>
                            </div>
                        </div>
                        <div className="year-book">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/81eI0ExR+VL.jpg" alt="" className="year-book-img" />
                            <div className="year-book-content">
                                <div className="year-book-name">Lost Children Archive</div>
                                <div className="year-book-author">by Valeria Luiselli</div>
                            </div>
                        </div>
                        <div className="year-book">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/81OF9eJDA4L.jpg" alt="" className="year-book-img" />
                            <div className="year-book-content">
                                <div className="year-book-name">Phantoms: A Thriller </div>
                                <div className="year-book-author">by Dean Koontz</div>
                            </div>
                        </div>
                        <div className="year-book">
                            <img src="https://m.media-amazon.com/images/I/515FWPyZ-5L.jpg" alt="" className="year-book-img" />
                            <div className="year-book-content">
                                <div className="year-book-name">Midnight in Chernobyl</div>
                                <div className="year-book-author">by Adam Higginbotham</div>
                            </div>
                        </div>
                        <div className="year-book">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/91dBtgERNUL.jpg" alt="" className="year-book-img" />
                            <div className="year-book-content">
                                <div className="year-book-name">10 Minutes 38 Seconds</div>
                                <div className="year-book-author">by Elif Shafak</div>
                            </div>
                        </div>
                    </div>
                    <div className="overlay"></div>
                </div>
                <div className="popular-books">
                    <div className="main-menu">
                        <div className="genre">Popular by Genre</div>
                        <div className="book-types">
                            <NavLink to="#" className="book-type"> All Genres</NavLink>
                            <NavLink to="#" className="book-type"> Action</NavLink>
                            <NavLink to="#" className="book-type"> Fantasy</NavLink>
                            <NavLink to="#" className="book-type"> Romance</NavLink>
                            <NavLink to="#" className="book-type"> Historical</NavLink>
                            <NavLink to="#" className="book-type"> Comedy</NavLink>
                        </div>
                    </div>
                    <div className="book-cards">
                        {!isLoading ? listBooks.map(book => (
                            <div className="book-card">
                                <div className="content-wrapper">
                                    <img className="book-card-img" src={require(`../assets/images/${book.imagePath}`)} alt="book-cover" />
                                    <NavLink to={`/book-detail/${book.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="card-content">
                                            <div className="book-name">{book.title}</div>
                                            <div className="book-by">by {book.author}</div>
                                            <div className="rate">
                                                <fieldset className="rating book-rate">
                                                    <input type="checkbox" id="star-c1" name="rating" value="5" />
                                                    <label className="full" for="star-c1"></label>
                                                    <input type="checkbox" id="star-c2" name="rating" value="4" />
                                                    <label className="full" for="star-c2"></label>
                                                    <input type="checkbox" id="star-c3" name="rating" value="3" />
                                                    <label className="full" for="star-c3"></label>
                                                    <input type="checkbox" id="star-c4" name="rating" value="2" />
                                                    <label className="full" for="star-c4"></label>
                                                    <input type="checkbox" id="star-c5" name="rating" value="1" />
                                                    <label className="full" for="star-c5"></label>
                                                </fieldset>
                                                <span className="book-voters card-vote">1.987 voters</span>
                                            </div>
                                            <div className="book-sum card-sum">{book.description}</div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        )) : (<h3>Loading...</h3>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;