import React from 'react'
import { useEffect, useReducer } from "react"
import { todoReducer } from '../08-useReducer/todoReducer';

const initialState = [
    // { id: new Date().getTime(), description: 'Recolectar la piedra del alma', done: false },
    // { id: new Date().getTime() * 3, description: 'Recolectar la piedra del infinito', done: false }
]

const init = () => {
    return JSON.parse(localStorage.getItem("todos") || []);
}

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    
        useEffect(() => {
            localStorage.setItem("todos", JSON.stringify(todos));
    
        }, [todos])
    
    
        const handleNewTodo = (todo) => {
            const action = { type: "ADD", payload: todo }
            dispatch(action);
        }
    
        const handleDeleteTodo = (id) => {
            const action = { type: "REMOVE", payload: id }
            dispatch(action);
        }
    
        const handleToggleTodo = (id) => {
            const action = { type: "TOGGLE", payload: id }
            dispatch(action);
        }

        let numTodos = todos.length;
        let numPending = todos.filter(todo => !todo.done).length; 

  return {todos, numTodos, numPending, handleNewTodo, handleDeleteTodo, handleToggleTodo}
  
}
