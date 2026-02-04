import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecondPg.css';

export default function SecondPg() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [containerPos, setContainerPos] = useState(50);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [targetItem, setTargetItem] = useState('cupid');
  const [message, setMessage] = useState('');
  const gameRef = useRef(null);
  const itemIdRef = useRef(0);

  const itemTypes = ['heart', 'rose', 'cupid'];
  const emojis = {
    heart: '❤️',
    rose: '🌹',
    cupid: '💘'
  };

  // Initialize game
  useEffect(() => {
    if (gameOver || win) return;

    const gameWidth = gameRef.current?.clientWidth || 800;

    // Generate falling items
    const interval = setInterval(() => {
      const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      const newItem = {
        id: itemIdRef.current++,
        type: randomType,
        left: Math.random() * (gameWidth - 40),
        top: -50
      };
      setItems(prev => [...prev, newItem]);
    }, 500);

    return () => clearInterval(interval);
  }, [gameOver, win]);

  // Move items down
  useEffect(() => {
    if (gameOver || win) return;

    const gameHeight = gameRef.current?.clientHeight || 600;
    const gameWidth = gameRef.current?.clientWidth || 800;

    const animationInterval = setInterval(() => {
      setItems(prev => {
        const updated = prev
          .map(item => ({ ...item, top: item.top + 5 }))
          .filter(item => {
            // Check if caught by container
            if (item.top + 50 >= gameHeight - 80) {
              const containerLeft = (containerPos / 100) * gameWidth - 40;
              const containerRight = containerLeft + 80;
              const itemLeft = item.left;
              const itemRight = item.left + 40;

              if (itemRight > containerLeft && itemLeft < containerRight) {
                if (item.type === targetItem) {
                  setMessage('✨ Caught the right one! ✨');
                  setScore(prev => prev + 10);
                  // Keep target as cupid
                  setTargetItem('cupid');
                } else {
                  setMessage('❌ Wrong item!');
                  setScore(prev => Math.max(0, prev - 5));
                }
                return false;
              }
            }

            // Remove if off screen
            return item.top < gameHeight;
          });

        return updated;
      });
    }, 30);

    return () => clearInterval(animationInterval);
  }, [containerPos, targetItem, gameOver, win]);

  // Check for win condition
  useEffect(() => {
    if (score > 100 && !win) {
      setWin(true);
    }
  }, [score, win]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setContainerPos(prev => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setContainerPos(prev => Math.min(100, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle mouse move for alternative control
  const handleMouseMove = (e) => {
    const rect = gameRef.current?.getBoundingClientRect();
    if (rect) {
      const newPos = ((e.clientX - rect.left) / rect.width) * 100;
      setContainerPos(Math.max(0, Math.min(100, newPos)));
    }
  };

  const resetGame = () => {
    setItems([]);
    setScore(0);
    setGameOver(false);
    setContainerPos(50);
    setTargetItem(itemTypes[0]);
    setMessage('');
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>💝 Catch My Valentine 💝</h1>
        <div className="game-info">
          <div className="target">
            Catch: <span className="target-emoji">
              {targetItem === 'cupid' ? (
                <img src="/images/game_image.png" alt="cupid" style={{ width: '40px', height: '40px' }} />
              ) : (
                emojis[targetItem]
              )}
            </span>
          </div>
          <div className="score">Score: {score}</div>
        </div>
      </div>

      <div
        className="game-area"
        ref={gameRef}
        onMouseMove={handleMouseMove}
      >
        {/* Falling items */}
        {items.map(item => (
          <div
            key={item.id}
            className="falling-item"
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
              fontSize: item.type === 'cupid' ? '40px' : '45px'
            }}
          >
            {item.type === 'cupid' ? (
              <img src="/images/game_image.png" alt="cupid" style={{ width: '40px', height: '40px' }} />
            ) : (
              emojis[item.type]
            )}
          </div>
        ))}

        {/* Catcher container */}
        <div
          className="catcher"
          style={{ left: `calc(${containerPos}% - 40px)` }}
        >
          👜
        </div>

        {/* Message display */}
        {message && (
          <div className="message">{message}</div>
        )}

        {/* Game over screen */}
        {gameOver && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}

        {/* Win screen */}
        {win && (
          <div className="game-over">
            <h2>We Win!</h2>
            <p>Congratulations! Your score is {score}.</p>
            <button onClick={() => navigate('/third')}>Let's Proceed</button>
          </div>
        )}
      </div>

      <div className="instructions">
        <p>Use <kbd>← →</kbd> arrow keys or move your mouse to control the basket</p>
        <p>Catch the correct item to earn points!</p>
      </div>
    </div>
  );
}
