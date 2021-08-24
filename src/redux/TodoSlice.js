import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const TodoSlice = createSlice({
  name: "todos",
  initialState: {
    todoslist: [],
  },
  reducers: {
    setTodo: (state, action) => {
      state.todoslist = [...action.payload];
    },

    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        title: action.payload.title,
        completed: false,
      };
      state.todoslist.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.todoslist.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todoslist[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      state.todoslist = state.todoslist.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
  },
});

export const getTodosAsync = () => {
  return async (dispatch) => {
    const resp = await fetch("http://localhost:7000/todos");
    if (resp.ok) {
      const todos = await resp.json();
      dispatch(TodoSlice.actions.setTodo(todos));
    }
  };
};

export const addTodoAsync = ({ title }) => {
  return async (dispatch) => {
    const resp = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      dispatch(TodoSlice.actions.addTodo(todo));
    }
  };
};

export const toggleCompleteAsync = (payload) => {
  return async (dispatch) => {
    const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      dispatch(TodoSlice.actions.toggleComplete(todo));
    }
  };
};

export const deleteTodoAsync = (payload) => {
  return async (dispatch) => {
    const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
    });

    if (resp.ok) {
      dispatch(TodoSlice.actions.deleteTodo({ id: payload.id }));
    }
  };
};

export const { addTodo, toggleComplete, deleteTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
