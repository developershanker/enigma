import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './Pages/Home';
import Game from './Pages/Game';
import Results from './Pages/Results';
import Leaderboard from './Pages/Leaderboard';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:name/:difficulty" element={<Game />} />
      <Route path="/results" element={<Results />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
    <Analytics />
  </>
);

export default App;
