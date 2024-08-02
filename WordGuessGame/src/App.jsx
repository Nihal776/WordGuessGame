import React, { useState, useEffect } from "react";
import "./App.css";

const sampleWords = 
[
  { word: "LIONEL MESSI", description: "An Argentine professional footballer widely regarded as one of the greatest players of all time, known for his skill, vision, and goal-scoring ability." },
  { word: "CRISTIANO RONALDO", description: "A Portuguese professional footballer known for his incredible athleticism, goal-scoring prowess, and numerous records." },
  { word: "NEYMAR", description: "A Brazilian professional footballer known for his flair, dribbling skills, and playmaking ability." },
  // { word: "KYLIE MBAPPE", description: "A French professional footballer known for his speed, finishing, and youth accomplishments." },
  // { word: "LUIS SUAREZ", description: "An Uruguayan professional footballer known for his finishing, movement, and controversial on-field incidents." },
  // { word: "ZLATAN IBRAHIMOVIC", description: "A Swedish professional footballer known for his strength, technique, and charisma." },
  // { word: "MOHAMED SALAH", description: "An Egyptian professional footballer known for his speed, dribbling, and goal-scoring ability." },
  // { word: "KEVIN DE BRUYNE", description: "A Belgian professional footballer known for his vision, passing, and midfield dominance." },
  // { word: "ROBERT LEWANDOWSKI", description: "A Polish professional footballer known for his goal-scoring ability and consistency." },
  // { word: "VIRGIL VAN DIJK", description: "A Dutch professional footballer known for his defensive prowess, leadership, and aerial ability." }
  
];

const getRandomWord = () => {
  const randomPlace = Math.floor(Math.random() * sampleWords.length);
  return sampleWords[randomPlace];
};

const WordGame = () => {
  const [wordData, setWordData] = useState(getRandomWord());
  const [msg, setMsg] = useState("");
  const [chosenLetters, setChosenLetters] = useState([]);
  const [hints, setHints] = useState(3);
  const [displayWord, setDisplayWord] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    if (wrongGuesses >= 3) {
      setTimeout(() => {
        window.alert("Game Over! You made too many wrong guesses.");
        restartGameFunction();
      }, 100);
    }
  }, [wrongGuesses]);

  const letterSelectFunction = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter]);
      if (!wordData.word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const hintFunction = () => {
    if (hints > 0) {
      const hiddenLetterIndex = wordData.word
        .split("")
        .findIndex((letter) => !chosenLetters.includes(letter));
      setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
      setHints(hints - 1);
    }
  };

  const removeCharacterFunction = () => {
    setChosenLetters(chosenLetters.slice(0, -1));
  };

  const displayLettersFunction = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from(letters).map((letter, index) => (
      <button
        key={index}
        onClick={() => letterSelectFunction(letter)}
        disabled={chosenLetters.includes(letter)}
        className={`letter-button ${
          chosenLetters.includes(letter) ? "selected" : ""
        }`}
      >
        {letter}
      </button>
    ));
  };

  const checkWordGuessedFunction = () => {
    return wordData.word.split("").every((letter) => chosenLetters.includes(letter));
  };

  const guessFunction = () => {
    if (checkWordGuessedFunction()) {
      setMsg("Congratulations! You have guessed the word correctly!");
    } else {
      setMsg("You made a Wrong Guess. Try again!");
      if (wrongGuesses >= 2) {
        setDisplayWord(true);
      }
    }
  };

  const restartGameFunction = () => {
    setWordData(getRandomWord());
    setMsg("");
    setChosenLetters([]);
    setHints(3);
    setDisplayWord(false);
    setWrongGuesses(0);
  };

  return (
    <div className="container">
      <h1>Word Guess Game</h1>
      <div className="word-container">
        {Array.from(wordData.word).map((letter, index) => (
          <div
            key={index}
            className={`letter ${chosenLetters.includes(letter) ? "visible" : ""}`}
          >
            {chosenLetters.includes(letter) ? letter : ""}
          </div>
        ))}
      </div>
      <p className="word-description">Hint: {wordData.description}</p>
      {msg && (
        <div className="message">
          <p>{msg}</p>
          {displayWord && <p>Correct word was: {wordData.word}</p>}
        </div>
      )}
      <div className="button-section">
        <div className="guess-section">
          <button
            onClick={restartGameFunction}
            className="restart-button"
          >
            Restart
          </button>
          <button
            onClick={removeCharacterFunction}
            disabled={!chosenLetters.length}
            className="remove-button"
          >
            Remove Letter
          </button>
        </div>
        <div className="letter-selection">
          {displayLettersFunction()}
        </div>
        <div className="hints">
          Hints Remaining: {hints}{" "}
          <button
            onClick={hintFunction}
            disabled={hints === 0}
            className="hint-button"
          >
            Get Hint
          </button>
        </div>
        {!msg && (
          <button
            onClick={guessFunction}
            disabled={!chosenLetters.length}
            className="guess-button"
          >
            Guess
          </button>
        )}
      </div>
    </div>
  );
};

export default WordGame;
