import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function RecipeSearch2() {

    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);

    let recipeHeaders = new Headers({
        "x-api-key": SPOONACULAR_API_KEY,
    });

    const recipeInit = {
        method: "GET",
        headers: recipeHeaders,
        cache: "default",
    };

    const recipeRequest = new Request(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&ranking=1&ignorePantry=true&number=5`);

    const fetchRecipes = () => {
        try {
            fetch(recipeRequest, recipeInit)
                .then(response => {
                    const recipes = response.json();
                }).then(recipes => {setRecipes(recipes)})
        } catch (e) {
            console.log(e);
        }
    } 

    function searchRecipes(event) {
        event.preventDefault()
        fetchRecipes();
    }

    return (
        <>
        <div className="page">
        <h1>Search Recipes</h1>
        <form action="" method="get" onSubmit={event=>searchRecipes(event)}>
            <label htmlFor="searchTerm">Ingredient:</label>
            <input 
                onChange={e => {setSearchTerm(e.target.value)}}
                type="text" 
                id="searchTerm" 
                name="searchTerm" 
                value={searchTerm} 
                pattern="[a-zA-Z]+"
            />
            <button type="submit" onClick={event=>searchRecipes(event)}>Search</button>
        </form>
        <table>
        {recipes.length > 0 ? <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Photo
                    </th> 
                </tr>
            </thead> : null }
        <tbody>
            {recipes.length > 0 && recipes.map(item => (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td><img src={item.image} alt={item.title} /></td>
                    <td><a href={`/recipeDetails/${item.id}`}><button>Details</button></a></td>
                </tr>
            ))}
        </tbody>
        </table>
        </div>
        </>
    );
}

export default RecipeSearch2;