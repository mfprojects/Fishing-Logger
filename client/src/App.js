import React, { useState } from 'react';
import './App.css';
import LureForm from './LureForm';
import LureList from './LureList';

function App() {
  //Refresher når ny Lure legges til for å vise i listen.
  const [refresh, setRefresh] = useState(false);
  const handleLureAdded = () => {
    setRefresh((prev) => !prev);
  };
  
  return (
    <div>
    <h1>Create Lure</h1>
    <LureForm onLureAdded={handleLureAdded}/>
    <LureList refresh={refresh}/>
  </div>
  );
}

export default App;
