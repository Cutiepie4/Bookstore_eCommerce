import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addBook, updateBook } from '../redux/bookSlice';

function Book() {

    const [image, setImage] = useState(null);

    const { state } = useLocation();

    const [book, setBook] = useState(state.book);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = (id) => {
        id === 0 ? dispatch(addBook(book)) : dispatch(updateBook(book));
        navigate('/books');
    }

    return (
        <div className="container form-control" style={{}}>
            <h1>Book</h1>
            <div className="row">
                <form className="col-lg-6">
                    <div className="row">
                        <div className="col">
                            <label for="" className="col-lg-10 form-label">Title</label>
                            <input type="text" className="col-lg-10  form-control" value={book.title} onChange={(e) => { setBook({ ...book, title: e.target.value }) }} />
                        </div>
                        <div className="col">
                            <label for="" className="col-lg-10 form-label">Author</label>
                            <input type="text" className="col-lg-10  form-control" value={book.author} onChange={(e) => { setBook({ ...book, author: e.target.value }) }} />
                        </div>
                    </div>
                    <hr />
                    <div className="col">
                        <label className="col-lg-12 form-label">Description about the book</label>
                        <textarea className="col-lg-11  form-control" cols="30" value={book.description} onChange={(e) => { setBook({ ...book, description: e.target.value }) }} ></textarea>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col">
                            <label for="" className="col-lg-10 form-label">Date
                                Established</label>
                            <input type="date" className="col-lg-10  form-control" value={book.date} onChange={(e) => { setBook({ ...book, date: e.target.value }) }} />
                        </div>
                        <div className="col">
                            <label for="" className="col-lg-10 form-label">Number of pages</label>
                            <input type="number" className="col-lg-10  form-control" value={book.page} onChange={(e) => { setBook({ ...book, page: e.target.value }) }} />
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className="col-6">
                            <label className="form-label" for="">Category</label>
                            <select className="border-1 form-select" value={book.category} onChange={(e) => { setBook({ ...book, category: e.target.value }) }}>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Historical">Historical</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="col-lg-10 form-label">Sold Copies</label>
                            <input type="number" className="col-lg-10  form-control" value={book.sold} onChange={(e) => { setBook({ ...book, sold: e.target.value }) }} />
                        </div>
                    </div>
                    <hr />
                    <div className="col-12">
                        <button className="btn btn-success" onClick={handleSubmit}>{book.id == undefined ? 'Save' : 'Edit'}</button>
                    </div>
                </form>

                <div className="col-lg-6">
                    <div>
                        <input type="file" accept="image/*" onChange={(e) => { setImage(e.target.files) }} />
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="upload-preview">
                                <img id="image-preview" className="card-img-top" src={image} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Book;