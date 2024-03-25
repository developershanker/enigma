import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MainPage from './Pages/MainPage';

const App = () => {
  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/mainpage/:slug/:params' element={<MainPage />}/>
       </Routes>

  );
}

export default App;
