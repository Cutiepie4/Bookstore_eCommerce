import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addBook, findBookById, updateBook } from '../redux/api';


function Book() {

    const { id } = useParams();

    const [image, setImage] = useState(null);

    const [book, setBook] = useState({});

    const [isEditable, setIsEditable] = useState(id == 0 ? true : false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

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

    const handleSubmit = (e) => {
        if (!isEditable) {
            e.preventDefault();
            setIsEditable(true);
            return;
        }
        const formData = new FormData();
        if (image !== null) formData.append('image', image);
        formData.append('book', JSON.stringify(book));
        id === 0 ? dispatch(addBook(formData)) : dispatch(updateBook(formData));
        navigate('/books');
    }

    return (
        <form className="container form-control" >
            <h1>Book</h1>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col">
                            <label className="col-lg-10 form-label">Title</label>
                            <input type="text" className="col-lg-10  form-control" value={book.title} onChange={(e) => { setBook({ ...book, title: e.target.value }) }} disabled={!isEditable} />
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label">Author</label>
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
                            <label className="col-lg-10 form-label">Date
                                Established</label>
                            <input type="date" className="col-lg-10  form-control" value={book.date} onChange={(e) => { setBook({ ...book, date: e.target.value }) }} disabled={!isEditable} />
                        </div>
                        <div className="col">
                            <label className="col-lg-10 form-label">Number of pages</label>
                            <input type="number" className="col-lg-10  form-control" value={book.page} onChange={(e) => { setBook({ ...book, page: e.target.value }) }} disabled={!isEditable} />
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
                            <label className="col-lg-10 form-label">Sold Copies</label>
                            <input type="number" className="col-lg-10  form-control" value={book.sold} onChange={(e) => { setBook({ ...book, sold: e.target.value }) }} disabled={!isEditable} />
                        </div>
                        <div className="col-4">
                            <label className="col-lg-10 form-label">Price (vnd)</label>
                            <input type="number" className="col-lg-10  form-control" value={book.price} onChange={(e) => { setBook({ ...book, price: e.target.value }) }} disabled={!isEditable} />
                        </div>
                    </div>
                    <hr />
                    <div className="col-12">
                        <button className="btn btn-success" onClick={handleSubmit}>{id === 0 ? 'Add' : (isEditable ? 'Save' : 'Edit')}</button>
                    </div>
                    {/* <label>{book.imagePath}</label> */}
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