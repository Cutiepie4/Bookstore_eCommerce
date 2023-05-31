import React, { useEffect } from 'react';
import '../styles/custom.scss'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, findTop5BestSellers } from '../redux/bookApi';
import { useState } from 'react';
import HomeBook from './HomeBook';

function Home() {

    const dispatch = useDispatch();
    const { isLoading, listBooks } = useSelector(state => state.bookReducer);
    const [listBestSellers, setListBestSellers] = useState([]);
    const [activeGenre, setActiveGenre] = useState('All');
    const [showingBooks, setShowingBooks] = useState([]);

    useEffect(() => {
        setShowingBooks(listBooks.filter(book => book.category === activeGenre));
    }, [activeGenre])

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
                            <div className="year-book" key={book.id}>
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
                        <div className="book-types d-flex">
                            <div className={`book-type ${activeGenre === 'All' ? 'active' : ''}`} onClick={() => setActiveGenre('All')}>All Genres</div>
                            <div className={`book-type ${activeGenre === 'Action' ? 'active' : ''}`} onClick={() => setActiveGenre('Action')}>Action</div>
                            <div className={`book-type ${activeGenre === 'Fantasy' ? 'active' : ''}`} onClick={() => setActiveGenre('Fantasy')}>Fantasy</div>
                            <div className={`book-type ${activeGenre === 'Romance' ? 'active' : ''}`} onClick={() => setActiveGenre('Romance')}>Romance</div>
                            <div className={`book-type ${activeGenre === 'Historical' ? 'active' : ''}`} onClick={() => setActiveGenre('Historical')}>Historical</div>
                            <div className={`book-type ${activeGenre === 'Comedy' ? 'active' : ''}`} onClick={() => setActiveGenre('Comedy')}>Comedy</div>
                        </div>
                    </div>
                    <div className="book-cards">
                        {!isLoading ? <HomeBook listBooks={activeGenre === 'All' ? listBooks : showingBooks} /> : (<h3>Loading...</h3>)}
                    </div>
                </div>
            </div >
        </>
    );
}

export default Home;