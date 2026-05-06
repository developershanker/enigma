import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../utils/data.json';
import Timer from '../components/Timer';
import OptionCard from '../components/OptionCard';
import ProgressBar from '../components/ProgressBar';
import './Game.scss';

const TIME_PER_RIDDLE = 20;
const RIDDLES_PER_GAME = 5;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Game = () => {
  const { name, difficulty } = useParams();
  const navigate = useNavigate();

  const [riddles, setRiddles] = useState([]);
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(TIME_PER_RIDDLE);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | playing | revealed

  // Refs to avoid stale closures in async callbacks
  const phaseRef = useRef('idle');
  const secondsRef = useRef(TIME_PER_RIDDLE);
  const answersRef = useRef([]);
  const intervalRef = useRef(null);
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { secondsRef.current = seconds; }, [seconds]);

  // Load and shuffle riddles for the chosen difficulty
  useEffect(() => {
    const pool = data.filter((r) => r.difficulty === difficulty);
    const picked = shuffle(pool).slice(0, RIDDLES_PER_GAME);
    setRiddles(picked);
    answersRef.current = [];
    setPhase('playing');
  }, [difficulty]);

  // Countdown timer — restarts whenever idx changes or phase becomes 'playing'
  useEffect(() => {
    if (phase !== 'playing') return;

    setSeconds(TIME_PER_RIDDLE);
    secondsRef.current = TIME_PER_RIDDLE;

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
  }, [idx, phase]);

  const finishGame = useCallback((finalAnswers) => {
    const totalScore = finalAnswers.reduce((sum, a) => sum + a.points, 0);
    navigateRef.current('/results', {
      replace: true,
      state: {
        score: totalScore,
        answers: finalAnswers,
        playerName: decodeURIComponent(name),
        difficulty,
        maxScore: RIDDLES_PER_GAME * (10 + TIME_PER_RIDDLE),
      },
    });
  }, [name, difficulty]);

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
        <span className="game__score">{totalScore} pts</span>
      </header>

      <ProgressBar current={idx} total={riddles.length} />

      <main className="game__main">
        <Timer seconds={seconds} maxSeconds={TIME_PER_RIDDLE} />

        <div className="game__question">
          <span className="game__badge">{difficulty}</span>
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
            Time's up! The answer was <strong>{riddle.answer}</strong>
          </p>
        )}
      </main>
    </div>
  );
};

export default Game;
