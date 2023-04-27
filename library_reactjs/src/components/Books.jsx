import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBook, fetchBooks } from '../redux/bookSlice';

function Books(props) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isLoading, listBooks } = useSelector(state => state.bookReducer);

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    return (
        <div className="container">
            <h1>Library</h1>
            <div>
                <button className="btn btn-primary" onClick={() => { navigate('/books/0', { state: { book: {} } }) }}>Add New Laptop</button>
            </div>

            <br />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Index</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Page count</th>
                        <th>Sold count</th>
                        <th>Date Established</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading ? listBooks.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.page}</td>
                            <td>{item.sold}</td>
                            <td>{item.date}</td>
                            <td>
                                <button style={{ 'marginRight': '8px' }} className="btn btn-success" onClick={() => { navigate(`/books/${item.id}`, { state: { book: item } }) }}>Edit</button>
                                <button className="btn btn-danger" onClick={() => { dispatch(deleteBook(item.id)) }}>Delete</button>
                            </td>
                        </tr>
                    )) : <tr key="0"><td><h3>Loading...</h3></td></tr>}
                </tbody>
            </table>
        </div>
    )
};

export default Books;