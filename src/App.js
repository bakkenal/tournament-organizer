import React, { useState } from 'react';
import './App.css';
import { RoundProps, rounds} from './utilities/bracket-organizer.ts';
import { Bracket } from 'react-brackets';
import { shuffle } from './utilities/team-shuffler';
import NameInput from './components/NameInput';
import './index.css';

import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAbJm8d0-U6cg0HIJWr6ywTxbkeAAtdCJc",
  authDomain: "cs497-purple-project1.firebaseapp.com",
  projectId: "cs497-purple-project1",
  storageBucket: "cs497-purple-project1.appspot.com",
  messagingSenderId: "1021754438766",
  appId: "1:1021754438766:web:a48fbcc3b1f7eca480627f",
  measurementId: "G-5WE4X9G2TB"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

const App = () => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const [names, setNames] = useState([]); //names is a list

  const clickHandler = () => {

    // make this a function later (rounds up to the next power of 2);
    let numGiven = names.length;

    let n = numGiven - 1;
    while ((n & n - 1) !== 0) {
      n = n & n - 1;
    }
    n = n << 1;

    console.log("numGiven: " + numGiven);
    console.log("nextPowerOf2: " + n);
    for (let i = 0; i < n - numGiven; i++) {
      names.push("BYE");
    }
    setNames(names);
    setButtonPressed(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TourneyGen</h1>
        <NameInput names={names} setNames={setNames} buttonPressed={buttonPressed} />
        <div>
          {(!buttonPressed) && <a href="#" className="button" onClick={clickHandler}>Generate Bracket</a>}
          {(buttonPressed) && <Bracket rounds={rounds(shuffle(names))} />}
        </div>  
      </header>
    </div>
  );
}

export default App;
