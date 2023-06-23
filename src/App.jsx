import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import RecipeSearch from './Components/ReceipeSearch';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route
          path="/" element={<RecipeSearch />}
        />
        {/* <Route path="/recipeDetails/:id" element={<PuzzlePage />} /> */}
      </Routes>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </>
  )
}

export default App;
