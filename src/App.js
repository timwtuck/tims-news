import './App.css';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Articles from './components/Articles';
import Header from './components/Header';

function App() {

  const api = axios.create({
        baseURL: "https://timmyt-news.herokuapp.com/api" 
    });

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Articles api={api}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
