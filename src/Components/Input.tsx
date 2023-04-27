import React from 'react';
import "./Input.css"
type Props={
    event:()=>void
}
function Input(props:Props) {
    return (
        <form>
            <input className='taskInput' type="text" placeholder='Enter the Task' onKeyDown={(e)=>{if(e.key=="Escape"){props.event()}}} autoFocus></input>
        </form>
        )
    }

export default Input;