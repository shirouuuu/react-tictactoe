import React, { useState } from "react";
import Game from "./Game";
import "../styles/App.css";
import Header from "./Header";

function App() {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-screen">
      <Header setHasStarted={setHasStarted} />
      {!hasStarted && (
        <div className="play-start-screen flex-grow flex flex-col justify-center items-center">
          <h1 className="text-6xl font-semibold drop-shadow-sm">
            Let's Play a Game of Tic Tac Toe
          </h1>
          <button
            className="mt-20 max-w-fit transition-all duration-500 bg-gradient-to-r from-mygreen via-myorange to-myblue bg-size-200 bg-pos-0 hover:bg-pos-100 text-white text- text-4xl font-bold py-5 px-8 rounded-full"
            onClick={() => {
              setHasStarted(true);
            }}
          >
            Play Game
          </button>
        </div>
      )}
      <div className="flex-grow flex justify-center items-center">
        {hasStarted && <Game />}
      </div>
    </div>
  );
}

export default App;
