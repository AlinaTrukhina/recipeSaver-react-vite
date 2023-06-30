import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function RecipeDetails() {

    const params = useParams();   
    const recipeId = params.id;
    const navigate = useNavigate();
    const [recipeGeneralInfo, setRecipeGeneralInfo] = useState({});
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);

    useEffect(() => {
        fetchRecipeSteps();
        fetchRecipeIngredients();
    }, [params]);

    let recipeHeaders = new Headers({
        "x-api-key": SPOONACULAR_API_KEY,
    });

    const recipeInit = {
        method: "GET",
        headers: recipeHeaders,
        cache: "default",
    };

    const fetchRecipeSteps = async () => {
        try {
            let recipeSteps = [];
            const recipeRequest = new Request(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`);
            const response = await fetch(recipeRequest, recipeInit);
            const recipeSteps1 = await response.json();
            const recipeSteps2 = await recipeSteps1[0].steps;
            for (let item of recipeSteps2) {
                let newEntry = { num: item.number, step: item.step }
                recipeSteps.push(newEntry);
            }
            setRecipeSteps(recipeSteps);
        } catch (e) {
            console.log(e);
        };
    } 

    const fetchRecipeIngredients = async () => {
        try {
            let recipeIngredients = [];
            const recipeRequest = new Request(`https://api.spoonacular.com/recipes/${recipeId}/information`);
            const response = await fetch(recipeRequest, recipeInit);
            const recipeInfo = await response.json();
            const recipeGeneralInfo = { 
                title: recipeInfo.title, 
                image: recipeInfo.image, 
                servings: recipeInfo.servings,  
                minutesReady: recipeInfo.readyInMinutes,
                dairyFree: recipeInfo.dairyFree,
                glutenFree: recipeInfo.glutenFree,
                lowFodmap: recipeInfo.lowFodmap,
                vegan: recipeInfo.vegan,
                vegetarian: recipeInfo.vegetarian
            };
            await setRecipeGeneralInfo(recipeGeneralInfo);

            const recipeIngredients2 = await recipeInfo.extendedIngredients;
            for (let item of recipeIngredients2) {
                let newEntry = { id: item.id, name: item.original }
                recipeIngredients.push(newEntry);
            }
            setRecipeIngredients(recipeIngredients);
        } catch (e) {
            console.log(e);
        };
    } 



    return (
        <>
        <div className="page">
            <h1>Recipe Details</h1>
            <h2>{recipeGeneralInfo.title}</h2>
            <img src={recipeGeneralInfo.image} alt={recipeGeneralInfo.title} />
            <p>Servings: {recipeGeneralInfo.servings}</p>
            <p>Ready in: {recipeGeneralInfo.minutesReady} minutes</p>
            <h3>Ingredients</h3>
            <ul>
                {recipeIngredients.map(s => 
                        <li key={s.id}>{s.name}</li>
                )}
            </ul>
            <h3>Steps</h3>
            <ol>
                {recipeSteps.map(s => 
                    <li key={s.num}>{s.step}</li>
                )}
            </ol>
        </div>
        </>
    );
}

export default RecipeDetails;