import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function RecipeDetails() {

    const params = useParams();   
    const recipeId = params.id;
    const navigate = useNavigate();
    const [recipeSteps, setRecipeSteps] = useState([]);

    useEffect(() => {
        fetchRecipeSteps();
    }, [params]);

    let recipeHeaders = new Headers({
        "x-api-key": SPOONACULAR_API_KEY,
    });

    const recipeInit = {
        method: "GET",
        headers: recipeHeaders,
        cache: "default",
    };

    const recipeRequest = new Request(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`);

    const fetchRecipeSteps = async () => {
        try {
            const response = await fetch(recipeRequest, recipeInit);
            const recipeSteps1 = await response.json();
            const recipeSteps = await recipeSteps1[0].steps;
            console.log(recipeSteps);
            await setRecipeSteps(recipeSteps);
        } catch (e) {
            console.log(e);
        }
    } 

    return(
        <>
            <h1>Recipe Details</h1>
            { recipeSteps.length > 0 ?? recipeSteps.map(s => 
                <li key={s.number}>{s.number}. {s.step}</li>
            )}
        </>
    );
}

export default RecipeDetails;