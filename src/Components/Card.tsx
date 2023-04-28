import React, { useCallback, useEffect, useReducer, useState } from 'react';

import useDate from '../Hooks/useDate';
import reducer from '../store/reducer';
import Add from './Add';
import "./Card.css"
import Input from './Input';
import Task from './Task';

//Type Declarations
type dateObjectFormat={
    month:string,
    day:string,
    dateValue:number,
    year:number
}
type task ={
    id:number,
    text:string,
    createdAt:number,
    completed:boolean
}
// Function removes Old tasks
function removeOldTask(list:task[]):task[]{
    let date = new Date();
    let filteredArray:task[]=list.filter((task)=>task.createdAt==date.getDate()) 
    localStorage.setItem("Tasks",JSON.stringify(filteredArray));
    return filteredArray;
}
let initailtaskList:task[] = removeOldTask(JSON.parse(localStorage.getItem("Tasks")!) || []);
// Returns a card Where dare and Task are Displayed
function Card():JSX.Element {
    const [state,dispatch]=useReducer(reducer,initailtaskList);
    const [showInput,setShowInput]=useState<boolean>(false);
    const date:dateObjectFormat = useDate();

    //Function to Show the input field
    const handleAddEvent = useCallback(() => {
        return setShowInput(true)
    },[showInput])

    // Function to hide the input field
    const handleEscape = useCallback(() => {
        return setShowInput(false);
    },[showInput]);

    // Escape Key handler Event
    useEffect(() => {
        const keyDownHandler = (event:KeyboardEvent) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            setShowInput(false);
          }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    },[]);
    
    return (
        <div className='card'>
            <div className='date-day'>          
             <div className='date-month-year'>
            <span className='dateValue'>{date.dateValue}</span>
            <div className='month-year'>
                <span className='monthValue'>{date.month}</span>
                <span className='yearValue'>{date.year}</span>
            </div>
             </div>
             <div className='day'>
              <span className='dayValue'>{date.day}</span>
             </div>
            </div>
            <Task state={state} dispatch={dispatch}/>
          
           {showInput ? <Input dispatch={dispatch} event={handleEscape}/> :<Add event={handleAddEvent}/>}
        </div>
    );
}

export default Card;