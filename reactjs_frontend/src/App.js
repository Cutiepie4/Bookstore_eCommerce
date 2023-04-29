import Book from './components/Book';
import Books from './components/Books';
import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Logout from './components/Logout';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Nav />} >
          <Route path='/books' element={<Books />} />
          <Route path='/books/:id' element={<Book />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
