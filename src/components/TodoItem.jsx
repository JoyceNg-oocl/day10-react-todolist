import {useContext, useEffect, useRef, useState} from "react";
import {Input, Modal, Tooltip} from "antd";
import {TodoContext} from "../contexts/TodoContext";
import {useNavigate} from "react-router-dom";
import {useTodoService} from "../useTodoService.";
import {DeleteFilled, EditFilled, ExpandOutlined, MoreOutlined,} from "@ant-design/icons";

export function TodoItem({todo}) {
  const {dispatch} = useContext(TodoContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [isTruncated, setIsTruncated] = useState(false);
  const menuRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();
  const {updateTodo, deleteTodo} = useTodoService();

  function makeAsDone() {
    updateTodo(todo).then((todo) =>
      dispatch({type: "UPDATE_TODO", payload: todo})
    );
  }

  function handleDelete() {
    deleteTodo(todo).then(() =>
      dispatch({type: "DELETE_TODO", payload: todo})
    );
    setMenuOpen(false);
  }

  function handleEdit() {
    setEditValue(todo.text);
    setEditModalOpen(true);
    setMenuOpen(false);
  }

  function handleEditOk() {
    if (editValue.trim() && editValue !== todo.text) {
      updateTodo({...todo, text: editValue}).then((updated) => {
        dispatch({type: "UPDATE_TODO", payload: updated});
        setEditModalOpen(false);
      });
    } else {
      setEditModalOpen(false);
    }
  }

  function handleEditCancel() {
    setEditModalOpen(false);
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

  useEffect(() => {
    function checkTruncate() {
      const el = textRef.current;
      if (!el) return setIsTruncated(false);
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }

    checkTruncate();
    window.addEventListener("resize", checkTruncate);
    const ro = new MutationObserver(checkTruncate);
    if (textRef.current)
      ro.observe(textRef.current, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    return () => {
      window.removeEventListener("resize", checkTruncate);
      ro.disconnect();
    };
  }, [todo.text]);

  return (
    <div className={"todo-item"}>
      <span
        className={todo.done ? "todo-done" : ""}
        onClick={makeAsDone}
        ref={textRef}
      >
        {isTruncated ? (
          <Tooltip title={todo.text}>
            <span>{todo.text}</span>
          </Tooltip>
        ) : (
          todo.text
        )}
      </span>
      <span className="todo-more-wrapper">
        <MoreOutlined
          className="todo-more-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="todo-menu" ref={menuRef}>
            <button
              className="todo-menu-item"
              onClick={() => {
                setMenuOpen(false);
                navigate(`/todos/${todo.id}`);
              }}
            >
              <ExpandOutlined style={{marginRight: 8}}/> Details
            </button>
            <button
              className="todo-menu-item todo-menu-edit"
              onClick={handleEdit}
            >
              <EditFilled style={{marginRight: 8}}/> Edit
            </button>
            <button
              className="todo-menu-item todo-menu-delete"
              onClick={handleDelete}
            >
              <DeleteFilled style={{marginRight: 8}}/> Delete
            </button>
          </div>
        )}
      </span>
      <Modal
        open={editModalOpen}
        title="Edit Task Name"
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onPressEnter={handleEditOk}
          autoFocus
        />
      </Modal>
    </div>
  );
}
