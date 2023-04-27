import React from 'react';
import { useState } from 'react';
import Task from '../Components/Task';
function addtoLocal(list){
    localStorage.setItem("Tasks",JSON.stringify(list));
}
function getlocalStorage(){
    return JSON.parse(localStorage.getItem("Tasks"));
}
function reducer(state:any,action:any) {
    switch(action.type){
        case "ADD":
            let storedArray=getlocalStorage();
            let newTask=[...storedArray,action.payload];
            addtoLocal(newTask);
            return newTask
        case "UPDATE":
            let id = action.payload;
            console.log(state);
            let taskArray=getlocalStorage();
            let updatedArray = taskArray.map((task)=>{
                if(task.id==id){
                    return {...task,completed: true}
                }
                return task;
            })
            localStorage.setItem("Tasks",JSON.stringify(updatedArray))
            return updatedArray
        default:
            return state
            

    }
    
}

export default reducer;