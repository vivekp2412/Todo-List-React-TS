import React, { useState } from 'react';
import "./Add.css"
//Type Defined for the Prop
type Props = {
  event:()=>void
}
//Returns Add button 
function Add(props:Props):JSX.Element {

    return (
      <>
      <button className='add' onClick={props.event}>

       <div className='plus'>+</div>
      </button>
      </>
    );
}

export default Add;