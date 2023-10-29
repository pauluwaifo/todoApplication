import React, { useEffect, useState } from "react";
import AppContext from "./appContext";
import { useReducer } from "react";
import { InitialState, InitialAuthState, LoadingState } from "./initialState";
import { todoReducer, authReducer, loadingReducer } from "../reducer/reducers";

function GlobalState(props) {
  const [todoState, todoDispatch] = useReducer(todoReducer, InitialState);
  const [authState, authDispatch] = useReducer(authReducer, InitialAuthState);
  const [isLoading, loadingDispatch] = useReducer(loadingReducer, LoadingState);
  const [todoInput, setTodoInput] = useState('')


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authState.currentUser));
  }, [authState.currentUser]);
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoState.todo));
  }, [todoState.todo]);

  return (
    <AppContext.Provider
      value={{
        todo: todoState.todo,
        todoDispatch,
        setTodoInput,
        todoInput,
        isAuth: authState.currentUser,
        authDispatch,
        isLoading: isLoading.loading,
        loadingDispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default GlobalState;
