import React, { useReducer, useState } from 'react';
import reducer from './reducer';
type task = {
    id:number,
    completed:boolean,
    text:string
}
function Tasklist() {
    const [tasklist,settasklist]=useState([])
    
    return (
        <div>
            
        </div>
    );
}

export default Tasklist