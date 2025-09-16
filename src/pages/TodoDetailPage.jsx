import React, {useContext} from "react";
import {useParams} from "react-router";
import {TodoContext} from "../contexts/TodoContext";
import {TodoItem} from "../components/TodoItem";
import {Link} from "react-router-dom";
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";

export function TodoDetailPage() {
  const {id} = useParams();
  const {state} = useContext(TodoContext);
  const todo = state.filter((todo) => todo.id === id);

  const dropdownItems = state.map((todo) => ({
    key: todo.id,
    label: (
      <Link to={`/todos/${todo.id}`}>
        {todo.text}
      </Link>
    ),
  }));

  if (todo.length === 0) {
    return <div>Todo item with id {id} not found.</div>;
  }

  return (
    <div>
      <h2 style={{textAlign: "center"}}>Todo Detail</h2>
      <Dropdown menu={{items: dropdownItems}}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Select Todo
            <DownOutlined/>
          </Space>
        </a>
      </Dropdown>
      <TodoItem todo={todo[0]} index={id}/>
    </div>
  );
}