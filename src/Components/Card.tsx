import React, { useEffect, useState } from 'react';
import useDate from '../Hooks/useDate';
import Add from './Add';
import "./Card.css"
import Input from './Input';
import Task from './Task';


type dateObjectFormat={
    month:string,
    day:string,
    dateValue:number,
    year:number
}
// Returns a card Where dare and Task are Displayed
function Card():JSX.Element {
  const [showInput,setShowInput]=useState<boolean>(false);
    const date:dateObjectFormat = useDate();
    //Function to Show the input field
    function handleAddEvent():void{
            setShowInput(true)
       }
    // Function to hide the input field
    function handleEscape():void{
            setShowInput(false);
    }
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
            <Task/>
           {showInput ? <Input event={handleEscape}/> :<Add event={handleAddEvent}/>}
        </div>
    );
}

export default Card;
