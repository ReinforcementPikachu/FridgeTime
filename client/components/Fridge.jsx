import React, { useEffect } from 'react'
import { useState, useRef} from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, createFood, selectFood, selectContents, selectIngredients, clearIngredients } from '../features/fridgeSlice'
import Food from './Food.jsx';
import { selectUserId, selectUsername } from '../features/userSlice';



const Fridge = () => {
    const newFood = useSelector(selectFood);
    const contents = useSelector(selectContents);
    const ingredients = useSelector(selectIngredients);
    const fridgeUserId = useSelector(selectUserId)
    const fridgeUsername = useSelector(selectUsername)
    const dispatch = useDispatch();
    const foodRef = useRef(null);
    const recipeForm = useRef(null)

    console.log('userId in fridge', fridgeUserId)
    console.log('username in fridge', fridgeUsername)

    useEffect(()=>{
        axios.get(`/api/fridge/${fridgeUserId}`)
        .then(res => console.log(res.data))
    })
    
    const addFood = (event) => {
        event.preventDefault();
        dispatch(addItem(newFood));
        foodRef.current.value = '';
    }

    const getRecipes = (event) => {
        event.preventDefault();
        console.log(ingredients)
        dispatch(clearIngredients())
        recipeForm.current.reset();
        // axios.post('api/recipe', { ingredients })
        // .then(res => {
        //     addRecipe(res.data)
        // })
    }

    return  (
        <div>
            <div>
                <form onSubmit={addFood}>
                    <input 
                    ref={foodRef}
                    id='foodItem' 
                    type='text' 
                    placeholder='Add food...' 
                    onChange={e => dispatch(createFood(e.target.value))}/>
                    <button type='submit'>Add</button>
                </form>
            </div>
            <div>
                <form onSubmit={getRecipes} ref={recipeForm}>
                    {contents.map((food, i) => <Food key={`f${i}`} food={food}/>)}
                    <button type='submit'>Get recipes</button>
                </form>
            </div>
        </div>
    )
}

export default Fridge;