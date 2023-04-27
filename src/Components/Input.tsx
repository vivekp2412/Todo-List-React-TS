import React, { memo, useEffect, useReducer, useRef, useState } from 'react';
import reducer from '../store/reducer';
import "./Input.css"
          

type Props={
    event:()=>void
}
function Input(props:Props) {
    const initailtaskList = JSON.parse(localStorage.getItem("Tasks")) || [];
    const[task,settask]=useState({id:0,completed:false,text:""});
    const [state,dispatch]=useReducer(reducer,initailtaskList);
    const inputref = useRef(null);
    // console.log(initailtaskList);
    function handleSubmit(e:any){
        e.preventDefault();
        let id = Math.ceil(Math.random()*1000);
        let completed=false;
        let text=inputref.current!.value;
        settask({id:id,completed:completed,text:text}); 
        
    }
    useEffect(()=>{
        // console.log(task);
        if(task.text!=""){
            dispatch({type:"ADD", payload:task});  
        }
        
    },[task])

    
    // console.log(task);
    
    return (
        <form>
            <input className='taskInput' ref={inputref} maxlength="30"  type="text" placeholder='Enter the Task' onKeyDown={(e)=>{if(e.key=="Escape"){props.event()}}} autoFocus></input>
            <button hidden type='submit' onClick={handleSubmit}></button>
        </form>
        )
    }

export default memo(Input);
