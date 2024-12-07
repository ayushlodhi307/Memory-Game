import React, { useEffect, useState } from "react";

const Memorygame = () => {
  // all the sates that are required for this project;

  // for managing size of the grid;
  const [gridSize, setGridSize] = useState(4);

  //  for managing cards that has to be placed in game;
  const [card, setCard] = useState([]);

  //  for managing the cards that are flipped;
  const [fliped, setFlipped] = useState([]);

  //  for managing the cards that are solved;
  const [solved, setSolved] = useState([]);

  //  disable to allow weather can other cards be flipped or not;
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);

    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCout = Math.floor(totalCards / 2);
    const number = [...Array(pairCout).keys()].map((n) => n + 1);
    const shuffleCards = [...number, ...number]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCard(shuffleCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };
  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = fliped;
    if (card[firstId].number === card[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (disabled || won) return;

    if (fliped.length === 0) {
      setFlipped([id]);
      return;
    }
    if (fliped.length === 1) {
      setDisabled(true);
      if (id !== fliped[0]) {
        setFlipped([...fliped, id]);
        //check match logic
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };
  const isFliped = (id) => fliped.includes(id) || solved.includes(id);

  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if(card.length===solved.length && card.length>0){
      setWon(true);
    }
  
  
    
  }, [card, solved])
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
      {/* {Input} */}

      <div>
        <label htmlFor="gridsize">Grid Size: (max 10)</label>
        <input
          type="number"
          id="gridsize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="ml-5 w-10"
        ></input>
      </div>

      {/* {Game Board} */}
      <div
        className={`grid gap-2 mb-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {card.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg 
                cursor-pointer transition-all duration-300 bg-gray-300 text-gray-400 ${
                  isFliped(card.id)
                    ? isSolved(card.id)
                      ? "bg-green-500 text-white"
                      : "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-400"
                }`}
            >
              {isFliped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>

      {/* {Result} */}

      {won && (
        <div className="mt-4 text-4xl font-bold text-green-600 animation-bounce">
          You Won
        </div>
      )}

      {/* {Reset/ Play again btn} */}
      <button 
      onClick={initializeGame}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        {won? "Play Again": "Reset"}
      </button>
    </div>
  );
};

export default Memorygame;
