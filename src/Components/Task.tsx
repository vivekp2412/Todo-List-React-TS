import React, { useReducer } from 'react';
import reducer from '../store/reducer';
import "./task.css";
//Type Defined for the Task Array 
type todoArray = {
    id:number,
    text:string,
    completed:boolean
}
// Return all the Task for Displaying
function Task():JSX.Element {
    // Dummy Task Array
    const initailtaskList = JSON.parse(localStorage.getItem("Tasks")) || [];
    const [state,dispatch]=useReducer(reducer,initailtaskList);
    const taskArray=JSON.parse(localStorage.getItem("Tasks"));
    function updateTodo(){
    
    }
    return(
        <ul className='tasklist'>
            
            {taskArray ? taskArray.map((task)=>(
                    <li className='todo-item'>
                    <p className={task.completed?'completedTask-text':"incompletedTask-text"}>{task.text}</p>
                    <input type="checkbox"  className="checkBox" onClick={()=>{dispatch({type:"UPDATE",payload:task.id})}} checked={task.completed?true:false}/>
                    </li>
            )):<h1>No task</h1>}
        </ul>    
    )
}

export default Task;