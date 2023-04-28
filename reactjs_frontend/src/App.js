import Book from './components/Book';
import Books from './components/Books';
import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Books />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id' element={<Book />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
