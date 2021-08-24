import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodoAsync, toggleCompleteAsync } from "../redux/TodoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={() =>
              dispatch(toggleCompleteAsync({ id, completed: !completed }))
            }
          ></input>
          {title}
        </span>
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(deleteTodoAsync({ id }));
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
