import React, { useState, useEffect } from 'react';
import './Game.css';
import Cards from '../Cards';
import playIcon from '../image/mute.png';
import pauseIcon from '../image/play.png';
import musique from '../music.mp3'

function Game() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [moves, setMoves] = useState(0); // Ajout de l'état pour les mouvements
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("myAudio");

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0; // Reset audio to the beginning
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startChronometer = () => {
    setIsRunning(true);
  };

  const stopChronometer = () => {
    setIsRunning(false);
  };



  return (
    
    <div className="Game-page">
   
      <label id="t1">Moves: <span>{moves}</span></label> {/* Affichage du nombre de mouvements */}
      <div id="chronometre">
        <span id="minutes">{String(minutes).padStart(2, '0')}</span>:
        <span id="secondes">{String(seconds).padStart(2, '0')}</span>
      </div>
      <h2 id="star">Start The Game</h2>
      <audio id="myAudio" src={musique}></audio>
      <button onClick={togglePlayPause} className="play-pause-button">
        <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause Button" />
      </button>
      <Cards 
        startChronometer={startChronometer} 
        stopChronometer={stopChronometer}
        moves={moves}  // Passez moves comme prop
        setMoves={setMoves}  // Passez le setter pour les mouvements
      />
  
    </div>
    
  );
}

export default Game;
