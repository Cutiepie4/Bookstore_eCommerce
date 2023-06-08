import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findBookById } from '../redux/bookApi';
import { toast } from 'react-toastify';
import { createConfig } from '../redux/bookApi';
import axios from 'axios';

function Book() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [book, setBook] = useState({});
    const [isEditable, setIsEditable] = useState(id == 0 ? true : false);

    const [titleMessage, setTitleMessage] = useState('');
    const [authorMessage, setAuthorMessage] = useState('');
    const [dateMessage, setDateMessage] = useState('');
    const [pageMessage, setPageMessage] = useState('');
    const [soldMessage, setSoldMessage] = useState('');
    const [priceMessage, setPriceMessage] = useState('');

    useEffect(() => {
        const findBook = async () => {
            const bookData = await findBookById(id);
            setBook(bookData);
        };
        findBook();
    }, [id])

    const handleAddBook = async (formData) => {
        await axios.post('http://localhost:8080/api/books/new', formData, createConfig())
            .then(res => { toast.success('Add book successfully!'); navigate('/books'); return res })
            .catch(error => { toast.error(error.response.data); return error.response.data });
    };

    const handleUpdateBook = async (formData) => {
        await axios.put('http://localhost:8080/api/books/update', formData, createConfig())
            .then(res => { toast.success('Update book successfully!'); navigate('/books'); return res.data })
            .catch(error => { toast.error(error.response.data); return error.response.data });
    };

    const checkEmptyInput = (text) => {
        if (!text || text.trim().length == 0) {
            return false;
        }
        return true;
    }

    const checkNumber = (num) => {
        if (!num) return false;
        return num > 0;
    }

    const handleSubmit = (e) => {
        let ok = true;
        e.preventDefault();
        if (!isEditable) {
            setIsEditable(true);
            return;
        }
        if (!checkEmptyInput(book.title)) {
            setTitleMessage('Required.');
            ok = false;
        }
        if (!checkEmptyInput(book.author)) {
            ok = false;
            setAuthorMessage('Required.');
        }
        if (!checkEmptyInput(book.date)) {
            ok = false;
            setDateMessage('Required.');
        }
        if (!checkNumber(book.page)) {
            ok = false;
            setPageMessage('Must be positive');
        }
        if (!checkNumber(book.sold)) {
            ok = false;
            setSoldMessage('Must be positive');
        }
        if (!checkNumber(book.price)) {
            ok = false;
            setPriceMessage('Must be positive');
        }

        if (!book.imagePath && (!image || image.length == 0)) {
            ok = false;
            toast.info('You must choose a cover for the new book!');
        }

        if (ok) {
            const formData = new FormData();
            if (image !== null) formData.append('image', image);
            formData.append('book', JSON.stringify(book));

            id == 0 ? (window.confirm('Are you sure to add this book ?') ? handleAddBook(formData) : e.preventDefault())
                : (window.confirm('Are you sure to update this book ?') ? handleUpdateBook(formData) : e.preventDefault());
        }
    }

    return (
        <form className="container form-control" >
            <h1>Book</h1>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col">
                            <label className="col-lg-10 form-label"><span className='required'>Title</span> <span style={{ color: 'red' }}>{titleMessage}</span></label>
                            <input type="text" className="col-lg-10  form-control" value={book.title} onChange={(e) => { setBook({ ...book, title: e.target.value }) }} disabled={!isEditable} />
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label"><span className='required'>Author</span> <span style={{ color: 'red' }}>{authorMessage}</span></label>
                            <input type="text" className="col-lg-10  form-control" value={book.author} onChange={(e) => { setBook({ ...book, author: e.target.value }) }} disabled={!isEditable} />
                        </div>
                    </div>
                    <hr />
                    <div className="col">
                        <label className="col-lg-12 form-label">Description about the book</label>
                        <textarea className="col-lg-11  form-control" cols="30" value={book.description} onChange={(e) => { setBook({ ...book, description: e.target.value }) }} disabled={!isEditable} ></textarea>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col">
                            <label className="col-lg-10 form-label"><span className='required'>Released Date</span> <span style={{ color: 'red' }}>{dateMessage}</span></label>
                            <input type="date" className="col-lg-10  form-control" value={book.date} onChange={(e) => { setBook({ ...book, date: e.target.value }) }} disabled={!isEditable} />
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label"><span>Pages</span> <span style={{ color: 'red' }}>{pageMessage}</span></label>
                            <input min={1} type="number" className="col-lg-10  form-control" value={book.page} onChange={(e) => { setBook({ ...book, page: e.target.value }) }} disabled={!isEditable} />
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className="col-4">
                            <label className="form-label">Category</label>
                            <select
                                className="border-1 form-select"
                                onChange={(e) => { setBook({ ...book, category: e.target.value }) }}
                                disabled={!isEditable}
                                defaultValue={book.category ? book.category : "default"}
                            >
                                <option disabled value="default">Select a category</option>
                                <option value="Action" selected={book.category === "Action"}>Action</option>
                                <option value="Comedy" selected={book.category === "Comedy"}>Comedy</option>
                                <option value="Fantasy" selected={book.category === "Fantasy"}>Fantasy</option>
                                <option value="Historical" selected={book.category === "Historical"}>Historical</option>
                                <option value="Horror" selected={book.category === "Horror"}>Horror</option>
                                <option value="Romance" selected={book.category === "Romance"}>Romance</option>
                                <option value="Thriller" selected={book.category === "Thriller"}>Thriller</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <label className="col-lg-10 form-label"><span>Sold Copies</span> <span style={{ color: 'red' }}>{soldMessage}</span></label>
                            <input min={0} type="number" className="col-lg-10  form-control" value={book.sold} onChange={(e) => { setBook({ ...book, sold: e.target.value }) }} disabled={!isEditable} />
                        </div>
                        <div className="col-4">
                            <label className="col-lg-10 form-label"><span>Price (vnđ)</span> <span style={{ color: 'red' }}>{priceMessage}</span></label>
                            <input min={1} type="number" className="col-lg-10  form-control" value={book.price} onChange={(e) => { setBook({ ...book, price: e.target.value }) }} disabled={!isEditable} />
                        </div>
                    </div>
                    <hr />
                    <div className="col-12">
                        <button className="btn btn-success" onClick={handleSubmit}>{id === 0 ? 'Add' : (isEditable ? 'Save' : 'Edit')}</button>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div>
                        <input type="file" accept="image/*" onChange={(e) => { setImage(e.target.files[0]) }} disabled={!isEditable} />
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="upload-preview">
                                {image === null && book.imagePath && (
                                    <img
                                        style={{ maxHeight: '480px', width: 'auto' }}
                                        className="card-img-top"
                                        src={require(`../assets/images/${book.imagePath}`)}
                                        alt='book-cover'
                                    />
                                )}
                                {image && (
                                    <img
                                        style={{ maxHeight: '480px', width: 'auto' }}
                                        className="card-img-top"
                                        src={URL.createObjectURL(image)}
                                        alt='book-cover'
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
}

export default Book;