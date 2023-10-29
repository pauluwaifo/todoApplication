// MY REDUCERS
import { EDIT, DELETE, ADD, LOGIN, LOGOUT, TOGGLE } from "../actions/actions";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case EDIT:
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === action.payload.id
            ? { ...item, value: action.payload.value, complete: action.payload.complete }
            : item
        ),
      };

    case TOGGLE:
      return {
        ...state,
        todo: state.todo.map((todo) =>
          todo.id === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        ),
      };
    case DELETE:
      return {
        ...state,
        todo: state.todo.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case "loadingTrue":
      return {
        ...state,
        loading: true,
      };
    case "loadingFalse":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
