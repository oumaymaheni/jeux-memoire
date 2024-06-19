import React, { useState, useEffect } from 'react';
import img1 from '../Components/image/3.jpeg';
import img2 from '../Components/image/4.jpeg';
import img3 from '../Components/image/7.jpeg';
import img4 from '../Components/image/8.jpeg';
import img5 from '../Components/image/6.jpeg';
import img6 from '../Components/image/10.jpeg';
import img7 from '../Components/image/11.jpeg';
import img8 from '../Components/image/88.jpeg';
import '../Components/Gamee/Game.css';
import Alert from '@mui/material/Alert';

function Cards({ startChronometer, stopChronometer, moves, setMoves}) { 
  const [items, setItems] = useState([
    { id: 1, img: img1, revealed: false, matched: false },
    { id: 1, img: img1, revealed: false, matched: false },
    { id: 2, img: img2, revealed: false, matched: false },
    { id: 2, img: img2, revealed: false, matched: false },
    { id: 3, img: img3, revealed: false, matched: false },
    { id: 3, img: img3, revealed: false, matched: false },
    { id: 4, img: img4, revealed: false, matched: false },
    { id: 4, img: img4, revealed: false, matched: false },
    { id: 5, img: img5, revealed: false, matched: false },
    { id: 5, img: img5, revealed: false, matched: false },
    { id: 6, img: img6, revealed: false, matched: false },
    { id: 6, img: img6, revealed: false, matched: false },
    { id: 7, img: img7, revealed: false, matched: false },
    { id: 7, img: img7, revealed: false, matched: false },
    { id: 8, img: img8, revealed: false, matched: false },
    { id: 8, img: img8, revealed: false, matched: false },
  ].sort(() => Math.random() - 0.5));

  const [selectedCards, setSelectedCards] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [remainingMovesAlert, setRemainingMovesAlert] = useState(false);

  const handleCardClick = (index) => {
    if (!hasStarted) {
      startChronometer();
      setHasStarted(true);
    }

    if (items[index].matched || items[index].revealed) return;

    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, revealed: true };
      }
      return item;
    });

    const newSelectedCards = [...selectedCards, { index, id: items[index].id }];

    setItems(newItems);
    setSelectedCards(newSelectedCards);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstCard, secondCard] = selectedCards;
      if (firstCard.id === secondCard.id) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === firstCard.id ? { ...item, matched: true } : item
          )
        );
      } else {
        setTimeout(() => {
          setItems((prevItems) =>
            prevItems.map((item, i) =>
              i === firstCard.index || i === secondCard.index
                ? { ...item, revealed: false }
                : item
            )
          );
        }, 1000);
      }
      setSelectedCards([]);
    }
  }, [selectedCards, setMoves]);

  useEffect(() => {
    const allMatched = items.every(item => item.matched);
    if (allMatched) {
      stopChronometer();
    }
  }, [items, stopChronometer]);

  useEffect(() => {
    if (moves === 10) {
      setRemainingMovesAlert(true);
      setTimeout(() => {
        setRemainingMovesAlert(false);
      }, 1000); // Masque l'alerte après 10 secondes
    }

    if (moves === 13) {
      setItems((prevItems) =>
        prevItems.map((item) => ({ ...item, matched: true }))
      );
      stopChronometer();
      setShowAlert(true);
    }
  }, [moves, stopChronometer, setItems]);

  return (
    <div>
       <div class="alert"> 
        {showAlert && <Alert severity="error" >Vous n'avez pas réussi.</Alert>}
        {remainingMovesAlert && <Alert severity="warning" >Il vous reste 3 tentatives.</Alert>}
        </div>
      <div className="image-container">
        <div className="image-box2">
          {items.map((item, index) => (
            <div
              className={`card ${item.revealed || item.matched ? 'revealed' : ''}`}
              key={index}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                <img src={item.img} alt={`card-${index}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
