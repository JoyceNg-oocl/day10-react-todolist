import {useContext, useState, useRef, useEffect} from "react";
import {TodoContext} from "../contexts/TodoContext";
import { IoMdMore, IoMdTrash } from 'react-icons/io';
import { MdZoomOutMap } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {api} from "../api/mockApi";

export function TodoItem({todo}) {
  const {dispatch} = useContext(TodoContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  function makeAsDone() {
    api.put(`/todos/${todo.id}`, {...todo, done: !todo.done})
      .then ((response) => response.data)
      .then((todo) => dispatch({type: "UPDATE_TODO", payload: todo}));
  }

  function handleDelete() {
    api.delete(`/todos/${todo.id}`)
      .then(() => console.log("Deleted"))
      .then((todo) => dispatch({type: "DELETE_TODO", payload: todo}));
    setMenuOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={"todo-item"}>
      <span
        className={todo.done ? "todo-done" : ""}
        onClick={makeAsDone}
      >
        {todo.text}
      </span>
      <span className="todo-more-wrapper">
        <IoMdMore className="todo-more-icon" onClick={() => setMenuOpen(!menuOpen)} />
        {menuOpen && (
          <div className="todo-menu" ref={menuRef}>
            <button
              className="todo-menu-item"
              onClick={() => {
                setMenuOpen(false);
                navigate(`/todos/${todo.id}`);
              }}
            >
              <MdZoomOutMap style={{marginRight: 6}} /> Details
            </button>
            <button className="todo-menu-item todo-menu-delete" onClick={handleDelete}>
              <IoMdTrash style={{marginRight: 6}} /> Delete
            </button>
          </div>
        )}
      </span>
    </div>
  );
}