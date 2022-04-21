import './App.css';
import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Articles from './components/Articles';
import Header from './components/Header';
import DisplayArticle from './components/DisplayArticle';
import Login from './components/Login';
import Account from './components/Account';

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/login' element={<Login setUser={setUser}/>}></Route>
        <Route path='/account' element={<Account user={user}/>}/>
        <Route path='/articles' element={<Articles/>}></Route>
        <Route path='/articles/:article_id' element={<DisplayArticle/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
