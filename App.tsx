
import React, { useState, useCallback } from 'react';
import { GameStatus, GameState } from './types';
import { GAME_CONFIG } from './constants';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    targetNumber: 0,
    attempts: 0,
    history: [],
    lastGuess: null,
    feedback: '',
    status: GameStatus.HOME,
    startTime: null,
    endTime: null
  });

  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('numPuzzleHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const startGame = useCallback(() => {
    const randomNum = Math.floor(Math.random() * (GAME_CONFIG.MAX_NUM - GAME_CONFIG.MIN_NUM + 1)) + GAME_CONFIG.MIN_NUM;
    setGameState({
      targetNumber: randomNum,
      attempts: 0,
      history: [],
      lastGuess: null,
      feedback: 'Waiting for your first scan sequence...',
      status: GameStatus.PLAYING,
      startTime: Date.now(),
      endTime: null
    });
  }, []);

  const resetToHome = useCallback(() => {
    setGameState(prev => ({ ...prev, status: GameStatus.HOME }));
  }, []);

  const handleGuess = useCallback((guess: number) => {
    // Range Validation
    if (isNaN(guess) || guess < GAME_CONFIG.MIN_NUM || guess > GAME_CONFIG.MAX_NUM) {
      setGameState(prev => ({ 
        ...prev, 
        feedback: `SYSTEM ERROR: Value must be between ${GAME_CONFIG.MIN_NUM}-${GAME_CONFIG.MAX_NUM}` 
      }));
      return;
    }

    setGameState(prev => {
      const newAttempts = prev.attempts + 1;
      const newHistory = [guess, ...prev.history];
      let newStatus = prev.status;
      let newFeedback = '';
      let newEndTime = null;

      // Comparison Logic
      if (guess === prev.targetNumber) {
        newStatus = GameStatus.WON;
        newFeedback = 'OVERRIDE SUCCESS: Target match found.';
        newEndTime = Date.now();
        
        const score = Math.max(0, 10000 - (newAttempts * 250));
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('numPuzzleHighScore', score.toString());
        }
        
        // Confetti Burst
        if ((window as any).confetti) {
          (window as any).confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#13b6ec', '#ffffff', '#00f2ff']
          });
        }
      } else if (newAttempts >= GAME_CONFIG.MAX_ATTEMPTS) {
        newStatus = GameStatus.GAMEOVER;
        newFeedback = 'SYSTEM FAILURE: Max attempts reached.';
        newEndTime = Date.now();
      } else if (guess < prev.targetNumber) {
        newFeedback = '🔼 HINT: Higher. Increase frequency.';
      } else {
        newFeedback = '🔽 HINT: Lower. Reduce frequency.';
      }

      return {
        ...prev,
        attempts: newAttempts,
        history: newHistory,
        lastGuess: guess,
        feedback: newFeedback,
        status: newStatus,
        endTime: newEndTime
      };
    });
  }, [highScore]);

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center">
      {gameState.status === GameStatus.HOME && (
        <HomeScreen onStart={startGame} highScore={highScore} />
      )}
      {gameState.status === GameStatus.PLAYING && (
        <GameScreen 
          state={gameState} 
          onGuess={handleGuess} 
          onQuit={resetToHome} 
        />
      )}
      {(gameState.status === GameStatus.WON || gameState.status === GameStatus.GAMEOVER) && (
        <ResultScreen 
          state={gameState} 
          onRestart={startGame} 
          onHome={resetToHome}
          highScore={highScore}
        />
      )}
    </div>
  );
};

export default App;
