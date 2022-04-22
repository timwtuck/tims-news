import './App.css';
import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Articles from './components/Articles';
import Header from './components/Header';
import DisplayArticle from './components/DisplayArticle';
import Login from './components/Login';
import Account from './components/Account';
import {displayPageStatusFeedback} from './utils';

function App() {

  const [user, setUser] = useState('tickle122');

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/login' element={<Login setUser={setUser}/>}></Route>
        <Route path='/account' element={<Account user={user}/>}/>
        <Route path='/articles' element={<Articles/>}></Route>
        <Route path='/articles/:article_id' element={<DisplayArticle user={user}/>}></Route>
        <Route path='*' element={displayPageStatusFeedback('not found', 'Error: 404\nPage Not Found')}/>
      </Routes>
    </div>
  );
}

export default App;
