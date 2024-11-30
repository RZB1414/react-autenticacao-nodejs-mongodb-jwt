import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Logon from './components/Logon';
import SearchUserName from './components/SearchUserName';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import BookInfoLibrary from './components/BookInfoLibrary';
import img from './assets/icons/background-3.jpeg';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <img src={img} alt='background' className='app-img' />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path='/auth/register' element={<Logon />} />
          <Route path='/auth/user/:id' element={<SearchUserName />} />
          <Route path='/auth/libraryBook' element={<BookInfoLibrary />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;