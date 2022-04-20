import './App.css';
import {Routes, Route} from 'react-router-dom';
import DisplayArticles from './components/DisplayArticles';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route to='/' element={<DisplayArticles/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
