import Book from './components/Book';
import Books from './components/Books';
import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Nav />} >
          <Route path='/books' element={<Books />} />
          <Route path='/books/:id' element={<Book />} />
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
