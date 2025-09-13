export function TodoAdd(props) {
  return <div className="todo-add-container">
    <input className={"todo-input"} type={"text"}/>
    <button
      className={"todo-add"}
      onClick={props.onClick}
    >
      add
    </button>
  </div>;
}