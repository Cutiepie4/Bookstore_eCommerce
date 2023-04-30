import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBook, fetchBooks } from '../redux/api';

function Books() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isLoading, listBooks } = useSelector(state => state.bookReducer);

    const { isLoggedIn, role } = useSelector(state => state.authReducer);

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    return (
        <div className="container">
            <h1>Library</h1>
            <div>
                {role === 'ADMIN' && <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => { navigate('/books/0', { state: { book: {} } }) }}>Add New Laptop</button>}
                <button className="btn btn-success" onClick={() => { dispatch(fetchBooks()) }}>Refresh</button>
            </div>

            <br />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Page count</th>
                        <th>Sold count</th>
                        <th>Date Established</th>
                        {role === 'ADMIN' && <th>Action</th>}
                    </tr>
                </thead>

                <tbody>
                    {!isLoading ? listBooks.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.page}</td>
                            <td>{item.sold}</td>
                            <td>{item.date}</td>
                            {role === 'ADMIN' && <td>
                                <button style={{ 'marginRight': '8px' }} className="btn btn-success" onClick={() => { navigate(`/books/${item.id}`, { state: { book: item } }) }}>Edit</button>
                                <button className="btn btn-danger" onClick={() => { dispatch(deleteBook(item.id)) }}>Delete</button>
                            </td>}
                        </tr>
                    )) : <tr key="0"><td><h3>Loading...</h3></td></tr>}
                </tbody>
            </table>
        </div>
    )
};

export default Books;