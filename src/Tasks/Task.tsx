import React, { Dispatch, SetStateAction, useEffect, useReducer } from "react";
import reducer from "../store/reducer";
import "./task.css";
import allDone from "./../images/MicrosoftTeams-image.png";

//Type Defined for the Task Array
type TodoArray = {
  id: number;
  text: string;
  completed: boolean;
};
type task = {
  id: number;
  text: string;
  createdAt: number;
  completed: boolean;
};
type Action = {
  type: string;
  id?: number;
  task?: task;
};
type Props = {
  state: task[];
  dispatch: Dispatch<Action>;
};
// Return all the Task for Displaying
function sort(list: task[]) {
  const sortedTodo = list.sort(
    (x, y) => Number(y.completed) - Number(x.completed)
  );
  return sortedTodo;
}
// Shows all the task on Screen
function Task(props: Props): JSX.Element {
  const { state, dispatch } = props;
  const sortedTodos = sort(state);
  useEffect(() => {}, [state]);
  return (
    <ul className="tasklist">
      {sortedTodos.length != 0 ? (
        sortedTodos.map((task) => (
          <li key={task.id} className="todo-item">
            <p
              className={
                task.completed ? "completedTask-text" : "incompletedTask-text"
              }
            >
              {task.text}
            </p>
            <input
              type="checkbox"
              className="checkBox"
              onChange={() => {
                dispatch({ type: "UPDATE", id: task.id });
              }}
              checked={task.completed ? true : false}
            />
          </li>
        ))
      ) : (
        <>
          <h3>All Task Done!</h3>
          <img className="notasks" src={allDone}></img>
        </>
      )}
    </ul>
  );
}

export default Task;
