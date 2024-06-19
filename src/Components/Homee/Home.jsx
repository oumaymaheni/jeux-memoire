import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div > 
    <Link to="/game" id="titre">
          Welcome to the game 
        </Link>
        </div>
   
  )
}

export default Home
