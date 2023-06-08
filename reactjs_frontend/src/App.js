import Book from './components/Book';
import Books from './components/Books';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import BookDetail from './components/BookDetail';
import { ToastContainer } from 'react-toastify';
import Register from './components/Register';
import AdminOrders from './components/AdminOrders';
import OrderDetail from './components/OrderDetail';
import UserOrders from './components/UserOrders';

function App() {
  return (
    <>
      <Routes>
        <Route path='/book-detail' element={<BookDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<Nav />} >
          <Route index element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/home' element={<Home />} />
          <Route path='/book-detail/:id' element={<BookDetail />} />

          <Route element={<AdminRoute />}>
            <Route path='/orders' element={<AdminOrders />} />
            <Route path='/orders/:id' element={<OrderDetail />} />
            <Route path='/books/:id' element={<Book />} />
          </Route>

          <Route element={<UserRoute />}>
            <Route path='/user-orders' element={<UserOrders />} />
            <Route path='/user-orders/:id' element={<OrderDetail />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
