import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Task from "../Components/Task";

//Type Declaration
type task = {
  id: number;
  text: string;
  createdAt: number;
  completed: boolean;
};

// Reducer Function 
function reducer(state:task[], action:any):task[] {
    // Sweet alert
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    // Actions in Reducer
    switch (action.type) {
       case "ADD":
          let date = new Date();
          const newTask:task = action.payload;
          if (newTask.text.trim() === ""){
            Toast.fire({
                 icon: "error",
                 title: "Please enter some task",
                 });
            return state;
          }
          newTask.id = Math.ceil(Math.random() * 10000);
          newTask.createdAt = date.getDate();
          let newTodos:task[] = [...state, newTask];
          localStorage.setItem("Tasks", JSON.stringify(newTodos));
          Toast.fire({
             icon: "success",
             title: "Task Added Successfully",
             });
          return newTodos;

        case "UPDATE":
          let id = action.payload;
          let updatedArray = state.map((task: task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
          });
         localStorage.setItem("Tasks", JSON.stringify(updatedArray));
         return updatedArray;
         
        case "DELETE":
          let answer = confirm("Are you sure");
           if(answer) {
            localStorage.setItem("Tasks", JSON.stringify([]));
            Toast.fire({
             icon: "success",
             title: "Task Deleted Successfully",
             });
            return [];
           }
        return state;

        default:
         return state;
  }
}

export default reducer;
