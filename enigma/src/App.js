import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import Home from './Pages/Home';
import Game from './Pages/Game';
import Results from './Pages/Results';
import Leaderboard from './Pages/Leaderboard';

const App = () => (
  <LanguageProvider>
    <LanguageToggle />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:name/:difficulty" element={<Game />} />
      <Route path="/results" element={<Results />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
    <Analytics />
  </LanguageProvider>
);

export default App;
