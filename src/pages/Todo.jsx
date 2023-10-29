import React, { useState } from "react";
import { useContext, useEffect } from "react";
import AppContext from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { EDIT, DELETE, ADD, LOGOUT, TOGGLE } from "../actions/actions";

// FONT AWESOME ICONS
{
  /* <i className="far fa-sun"></i>
    <i className="fas fa-sun"></i>
    <i className="far fa-moon"></i>
    <i className="fas fa-moon"></i> 
*/
}
const currentDateTime = new Date();
const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayIndex = currentDateTime.getDay();
const day = currentDateTime.getDate();
const formattedDateTime = `${day} ${daysOfTheWeek[dayIndex]}`;

function Todo() {
  const { todo, todoDispatch, setTodoInput, todoInput, isAuth, authDispatch } =
    useContext(AppContext);
  const [updateId, setUpdateId] = useState(null);
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    authDispatch({ type: LOGOUT });
    navigate("/login");
  };
  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: updateId ? updateId : Math.floor(Math.random() * 1000),
      value: todoInput,
      complete: false,
      time: formattedDateTime,
    };

    if (updateId) {
      todoDispatch({ type: EDIT, payload: newTodo });
      setUpdateId(null);
    } else {
      todoDispatch({
        type: ADD,
        payload: newTodo,
      });
    }
    setTodoInput("");
    console.log(todo);
  };
  const handleEdit = (id, value) => {
    setUpdateId(id);
    setTodoInput(value);
  };

  const list = todo.map((text) => {
    return (
      <li className="todo_list" key={text.id}>
        {/* pending and success indication */}
        <div className="complete">
          <div
            className={`complete_indicator ${
              text.complete ? "success" : "pending"
            }`}
          >
            {text.complete ? "success" : "pending.."}
          </div>
        </div>

        {/* task*/}
        <div className="todo_text">{text.value}</div>
        {/* delete and edit button */}
        <div className="todo_btn">
          <button
            onClick={() => todoDispatch({ type: DELETE, payload: text.id })}
          >
            <i className="far fa-trash-alt"></i>
          </button>
          <button onClick={() => handleEdit(text.id, text.value)}>
            <i className="far fa-edit"></i>
          </button>
        </div>
        {/* icon */}
        <div className="todo_icon">
          <div className="b-bottom md-p2 w-p15"></div>
          <div className="b-bottom md-p2 w-p30"></div>
          <div className="b-bottom md-p2 w-p10"></div>
        </div>
        {/* date */}
        <div className="todo_date">{text.time}</div>

        {/* mark button */}
        <div className="todo_btn">
          <button
            className="check"
            onClick={() => todoDispatch({ type: TOGGLE, payload: text.id })}
          >
            {text.complete ? (
              <i className="fas fa-check"></i>
            ) : (
              // <i className="fas fa-check"></i>
              ""
            )}
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="todo">
      <div className="p-2">
        <div className="nav">
          {isAuth && <button onClick={() => handleLogout()}>Logout</button>}
        </div>
        {isAuth ? (
          <>
            <form className="my_form" onSubmit={handleAddTodo}>
              <input
                type="text"
                value={todoInput}
                placeholder="Enter text..."
                onChange={(e) => setTodoInput(e.target.value)}
              />
              <button
                disabled={todoInput === "" || todoInput === null}
                type="submit"
              >
                TO DO
              </button>
            </form>
            <ul>{list}</ul>
          </>
        ) : (
          <p>You Logged out</p>
        )}
      </div>
    </div>
  );
}

export default Todo;
