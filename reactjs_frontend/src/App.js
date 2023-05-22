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


function App() {
  return (
    <Routes>
      <Route path='/book-detail' element={<BookDetail />} />

      <Route path='/' element={<Nav />} >
        <Route path='/login' element={<Login />} />
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
  );
}

export default App;
