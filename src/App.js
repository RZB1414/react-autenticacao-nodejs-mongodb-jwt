import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Logon from './components/Logon';
import SearchAllUsers from './components/SearchAllUsers';
import SearchUserName from './components/SearchUserName';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path='/auth/register' element={<Logon />} />
          <Route path='/auth/users' element={<SearchAllUsers />} />
          <Route path='/auth/user/:id' element={<SearchUserName />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;