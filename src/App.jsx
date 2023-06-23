import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import RecipeSearch from './Components/ReceipeSearch';
import RecipeDetails from './Components/RecipeDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<RecipeSearch />}
        />
        <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
      </Routes>
      <h1>Vite + React</h1>
    </>
  )
}

export default App;
