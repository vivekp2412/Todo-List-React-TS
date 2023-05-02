import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Task from "../Tasks/Task";

//Type Declaration
type Task = {
  id: number;
  text: string;
  createdAt: number;
  completed: boolean;
};
type Action = {
  type: string;
  id?: number;
  task?: Task;
};

// Reducer Function
function reducer(state: Task[], action:Action): Task[] {
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
      let date: Date = new Date();
      
      let newTask:Task=action.task!;
  
      if (newTask.text.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "Please enter some task",
        });
        return state;
      }
      newTask.id = Math.ceil(Math.random() * 10000);
      newTask.createdAt = date.getDate();
      let newTodos: Task[] = [...state, newTask];
      localStorage.setItem("Tasks", JSON.stringify(newTodos));
      Toast.fire({
        icon: "success",
        title: "Task Added Successfully",
      });
      return newTodos;
    
    case "UPDATE":
      let id: number = action.id!;
      let updatedArray: Task[] = state.map((task: Task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("Tasks", JSON.stringify(updatedArray));
      return updatedArray;

    case "DELETE":
      let answer: boolean = confirm("Are you sure want to Delete all Tasks");
      if (answer) {
        Toast.fire({
          icon: "success",
          title: "Task deleted Successfully",
        });
        localStorage.setItem("Tasks", JSON.stringify([]));
        return [];
      }
      return state;
    default:
      return state;
  }
}

export default reducer;
