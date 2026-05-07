import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dataEn from '../utils/data.json';
import dataHi from '../utils/data.hi.json';
import { useLanguage } from '../context/LanguageContext';
import Timer from '../components/Timer';
import OptionCard from '../components/OptionCard';
import ProgressBar from '../components/ProgressBar';
import './Game.scss';

const TIMER_BY_DIFFICULTY = { easy: 25, medium: 20, hard: 15 };
const RIDDLES_PER_GAME = 5;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Game = () => {
  const { name, difficulty } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const timeLimit = TIMER_BY_DIFFICULTY[difficulty] ?? 20;

  const [riddles, setRiddles] = useState([]);
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(timeLimit);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | playing | revealed

  // Refs to avoid stale closures in async callbacks
  const phaseRef = useRef('idle');
  const secondsRef = useRef(timeLimit);
  const answersRef = useRef([]);
  const intervalRef = useRef(null);
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { secondsRef.current = seconds; }, [seconds]);

  // Load and shuffle riddles + shuffle each riddle's options
  useEffect(() => {
    const data = lang === 'hi' ? dataHi : dataEn;
    const pool = data.filter((r) => r.difficulty === difficulty);
    const picked = shuffle(pool)
      .slice(0, RIDDLES_PER_GAME)
      .map((r) => ({ ...r, options: shuffle(r.options) }));
    setRiddles(picked);
    answersRef.current = [];
    setIdx(0);
    setPhase('playing');
  }, [difficulty, lang]);

  // Countdown — restarts on each new riddle (idx change) or when phase becomes 'playing'
  useEffect(() => {
    if (phase !== 'playing') return;

    setSeconds(timeLimit);
    secondsRef.current = timeLimit;

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          secondsRef.current = 0;
          return 0;
        }
        secondsRef.current = s - 1;
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [idx, phase, timeLimit]);

  const finishGame = useCallback((finalAnswers) => {
    const totalScore = finalAnswers.reduce((sum, a) => sum + a.points, 0);
    navigateRef.current('/results', {
      replace: true,
      state: {
        score: totalScore,
        answers: finalAnswers,
        playerName: decodeURIComponent(name),
        difficulty,
        maxScore: RIDDLES_PER_GAME * (10 + timeLimit),
      },
    });
  }, [name, difficulty, timeLimit]);

  const reveal = useCallback((option) => {
    if (phaseRef.current !== 'playing') return;
    clearInterval(intervalRef.current);

    const riddle = riddles[idx];
    if (!riddle) return;

    const isCorrect = option !== null && option === riddle.answer;
    const timeBonus = isCorrect ? secondsRef.current : 0;
    const points = isCorrect ? 10 + timeBonus : 0;

    const newAnswer = {
      question: riddle.question,
      userAnswer: option,
      correctAnswer: riddle.answer,
      isCorrect,
      points,
    };

    const newAnswers = [...answersRef.current, newAnswer];
    answersRef.current = newAnswers;

    setSelected(option);
    setPhase('revealed');

    const isLast = idx + 1 >= riddles.length;
    const delay = option === null ? 2000 : 1500;

    setTimeout(() => {
      if (isLast) {
        finishGame(newAnswers);
      } else {
        setIdx((i) => i + 1);
        setSelected(null);
        setPhase('playing');
      }
    }, delay);
  }, [riddles, idx, finishGame]);

  // Trigger timeout when timer reaches zero
  useEffect(() => {
    if (seconds === 0 && phase === 'playing') {
      reveal(null);
    }
  }, [seconds, phase, reveal]);

  if (!riddles.length) {
    return (
      <div className="game game--loading">
        <div className="game__spinner" />
      </div>
    );
  }

  const riddle = riddles[idx];
  const playerName = decodeURIComponent(name);
  const totalScore = answersRef.current.reduce((s, a) => s + a.points, 0);

  const getOptionState = (option) => {
    if (phase !== 'revealed') return selected === option ? 'selected' : 'default';
    if (option === riddle.answer) return 'correct';
    if (option === selected) return 'wrong';
    return 'default';
  };

  return (
    <div className="game">
      <header className="game__header">
        <span className="game__player">{playerName}</span>
        <span className="game__score">{totalScore} {t('pts')}</span>
      </header>

      <ProgressBar current={idx} total={riddles.length} />

      <main className="game__main">
        <Timer seconds={seconds} maxSeconds={timeLimit} />

        <div className="game__question">
          <span className="game__badge">{t(difficulty)}</span>
          <h2>{riddle.question}</h2>
        </div>

        <div className="game__options">
          {riddle.options.map((option, i) => (
            <OptionCard
              key={i}
              text={option}
              state={getOptionState(option)}
              onClick={() => reveal(option)}
              disabled={phase === 'revealed'}
            />
          ))}
        </div>

        {phase === 'revealed' && selected === null && (
          <p className="game__timeout-msg">
            {t('timesUp')} <strong>{riddle.answer}</strong>
          </p>
        )}
      </main>
    </div>
  );
};

export default Game;
