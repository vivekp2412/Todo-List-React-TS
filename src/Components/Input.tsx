import React, { memo, useEffect, useReducer, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import reducer from '../store/reducer';
import "./Input.css"
          
//Type Declaration for Props
type Props={
    event:()=>void
    dispatch:({})=>void
}
// Returns Input field
function Input(props:Props):JSX.Element {
    const {dispatch} = props;
    const[task,setTask]=useState({id:0,completed:false,text:"",createdAt:0});
    
    // Function handling Input
    function handleSubmit(e:any):void{
        e.preventDefault();
        if(task.text=="DELETE"){
            dispatch({type:"DELETE"});
            props.event()
            return
        }
        if(task.text!==""){
            dispatch({type:"ADD", payload:task}); 
            setTask((prevedata)=>({...prevedata,text:''}))
        }
    }
    
    return (
        <form>
            <ToastContainer/>
            <input className='taskInput' value={task.text} onChange={(e) => setTask((prev) => ({...prev,text: e.target.value}))}  maxLength={25}  type="text" placeholder='Enter the Task' onKeyDown={(e)=>{if(e.key=="Escape"){props.event()}}} autoFocus></input>
            <h6 className='instruction'>Enter "DELETE" to Clear the list</h6>
            <button hidden type='submit' onClick={handleSubmit}></button>
        </form>
        )
    }

export default memo(Input);
