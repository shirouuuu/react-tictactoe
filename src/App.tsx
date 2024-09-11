import React from "react";
import Game from "./Game";
import "./App.css";
import Header from "./Header";

function App() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-full">
        <Game />
      </div>
    </div>
  );
}

export default App;
