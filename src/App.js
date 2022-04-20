import './App.css';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Articles from './components/Articles';
import Header from './components/Header';
import DisplayArticle from './components/DisplayArticle';

function App() {

  const api = axios.create({
        baseURL: "https://timmyt-news.herokuapp.com/api" 
    });

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Articles api={api}/>}></Route>
        <Route path='/articles/:article_id' element={<DisplayArticle api={api}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
