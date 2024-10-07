import './App.css';
import Header from './components/Header';
import LogOn from './components/Logon';
import SearchAllUsers from './components/SearchAllUsers';
import SearchUserName from './components/SearchUserName';

function App() {
  return (
    <div className="App">
      <Header />
      <LogOn />
      <SearchAllUsers />
      <SearchUserName />
    </div>
  )
}

export default App;
