import React from 'react';
import './todo_btn.css';
import todoIcon from '../../assets/To_do_SVG.svg';

const Todo_btn = ({ onOpen }) => {
  return (
    <button
      type="button"
      className="todo-icon todo-icon-btn"
      onClick={onOpen}
      aria-label="Open To-Do"
    >
      <img src={todoIcon} alt="todo" className="todo-icon-img" />
    </button>
  );
};

export default Todo_btn;
