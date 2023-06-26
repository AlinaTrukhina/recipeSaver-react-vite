import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import RecipeSearch from './Components/ReceipeSearch';
import RecipeDetails from './Components/RecipeDetails';
import SidebarNav from './Components/SidebarNav';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SidebarNav />
      
      <Routes>
        <Route path="/" element={<RecipeSearch />}/>

        <Route path="/2" element={<RecipeSearch />}/>

        <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  )
}

export default App;
