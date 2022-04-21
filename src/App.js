import './App.css';
import {Routes, Route} from 'react-router-dom';
import Articles from './components/Articles';
import Header from './components/Header';
import DisplayArticle from './components/DisplayArticle';

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Articles/>}></Route>
        <Route path='/articles' element={<Articles/>}></Route>
        <Route path='/articles/:article_id' element={<DisplayArticle/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
