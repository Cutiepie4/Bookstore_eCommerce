import React, { useEffect } from 'react';
import '../styles/custom.scss'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, findTop5BestSellers } from '../redux/bookApi';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Home(props) {

    const dispatch = useDispatch();

    const { isLoading, listBooks } = useSelector(state => state.bookReducer);

    const [listBestSellers, setListBestSellers] = useState([]);

    useEffect(() => {
        dispatch(fetchBooks());
        const fetchBestSeller = async () => {
            const res = await findTop5BestSellers();
            setListBestSellers(res);
        }
        fetchBestSeller();
    }, [])

    return (
        <>
            <div className="main-wrapper">
                <div className="books-of">
                    <div className="week year">
                        <div className="author-title fs-5 mt-3">Best Sellers</div>
                        {listBestSellers && listBestSellers.map(book => (
                            <div className="year-book">
                                <img src={require(`../assets/images/${book.imagePath}`)} alt="book-cover" className="year-book-img" />
                                <div className="year-book-content">
                                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/book-detail/${book.id}`}>
                                        <div className="year-book-name ">{book.title}</div>
                                    </NavLink>
                                    <div className="year-book-author">by {book.author}</div>
                                </div>
                            </div>
                        ))}
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
                            <div key={book.id} className="book-card" >
                                <div className="content-wrapper">
                                    <img className="book-card-img" src={require(`../assets/images/${book.imagePath}`)} alt="book-cover" />
                                    <NavLink to={`/book-detail/${book.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="card-content">
                                            <div className="book-name">{book.title}</div>
                                            <div className="book-by">by {book.author}</div>
                                            <div className="rate">
                                                <fieldset className="rating book-rate">
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
            </div >
        </>
    );
}

export default Home;