import React, { useCallback, useEffect, useReducer, useState } from "react";
import useDate from "../../Hooks/useDate";
import reducer from "../../store/reducer";
import Task from "../../Tasks/Task";
import "../../App.css";

//Type Declarations
type DateObjectFormat = {
  month: string;
  day: string;
  dateValue: number;
  year: number;
};
type Task = {
  id: number;
  text: string;
  createdAt: number;
  completed: boolean;
};
// Function removes Old tasks
function removeOldTask(list: Task[]): Task[] {
  let date: Date = new Date();
  let filteredArray: Task[] = list.filter(
    (task) => task.createdAt == date.getDate()
  );
  localStorage.setItem("Tasks", JSON.stringify(filteredArray));
  return filteredArray;
}
let initailtaskList: Task[] = removeOldTask(
  JSON.parse(localStorage.getItem("Tasks")!) || []
);
// Returns a card Where dare and Task are Displayed
function Card(): JSX.Element {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [task, setTask] = useState<Task>({
    id: 0,
    completed: false,
    text: "",
    createdAt: 0,
  });
  const [state, dispatch] = useReducer(reducer, initailtaskList);
  const date: DateObjectFormat = useDate();
  //Function to Show the input field
  function handleAddEvent(): void {
    setShowInput(true);
  }

  // Function to hide the input field
  function handleEscape(): void {
    setTask((prevedata) => ({ ...prevedata, text: "" }));
    setShowInput(false);
  }
  //Function add the input data as Task
  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    if (task.text == "DELETE") {
      dispatch({ type: "DELETE" });
      handleEscape();
      return;
    }
    if (task.text !== "") {
      dispatch({ type: "ADD", task: task });
      setTask((prevedata) => ({ ...prevedata, text: "" }));
    }
  }
  // Escape Key handler Event
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        setShowInput(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div className="card">
      <div className="date-day">
        <div className="date-month-year">
          <span className="dateValue">{date.dateValue}</span>
          <div className="month-year">
            <span className="monthValue">{date.month}</span>
            <span className="yearValue">{date.year}</span>
          </div>
        </div>
        <div className="day">
          <span className="dayValue">{date.day}</span>
        </div>
      </div>
      <Task state={state} dispatch={dispatch} />
      {showInput ? (
        <div className="inputfield">
          <input
            className="taskInput"
            value={task.text}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, text: e.target.value }))
            }
            type="text"
            placeholder="Enter the Task"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            autoFocus
          ></input>
          <h6 className="instruction">Enter "DELETE" to Clear the list</h6>
        </div>
      ) : (
        <>
          <button className="add" onClick={handleAddEvent}>
            <div className="plus">+</div>
          </button>
        </>
      )}
    </div>
  );
}

export default Card;
