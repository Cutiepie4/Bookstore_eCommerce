import Book from './components/Book';
import Books from './components/Books';
import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import BookDetail from './components/BookDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/book-detail' element={<BookDetail />} />
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Nav />} >
          <Route index element={<Home />} />
          <Route path='/book-detail/:id' element={<BookDetail />} />

          <Route element={<AdminRoute />}>
            <Route path='/books' element={<Books />} />
            <Route path='/books/:id' element={<Book />} />
          </Route>

          <Route element={<UserRoute />}>
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Route>

      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
