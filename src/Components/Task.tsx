import React from 'react';
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
    const taskArray:todoArray[] = [{id:4444,text:"Buy new SweatShirt",completed:true},{id:4444,text:"Begin Promotioonal Phase",completed:true},{id:4444,text:"Read a Article",completed:false},{id:4444,text:"Try to fall asleep",completed:false},{id:4444,text:"Water Sherlock",completed:false},{id:4444,text:"Begin QA for Product",completed:false},{id:4444,text:"Go for a walk",completed:false}]
    
    return(
        <ul className='tasklist'>
            {taskArray.map((task)=>(
                    <li className='todo-item'>
                    <p className={task.completed?'completedTask-text':"incompletedTask-text"}>{task.text}</p>
                    <input type="checkbox" className="checkBox" checked={task.completed?true:false}/>
                    </li>
            ))}
        </ul>    
    )
}

export default Task;