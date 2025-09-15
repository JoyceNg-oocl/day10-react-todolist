import {api} from "./api/mockApi";

export function useTodoService() {
  const loadTodo = () => api.get("/todos")
    .then(response => response.data);

  const createTodo = (input) => {
    return api.post("/todos", {text: input.value, done: false})
      .then((response) => response.data);
  }

  const updateTodo = (todo) => {
    return api.put(`/todos/${todo.id}`, {...todo, done: !todo.done})
      .then((response) => response.data);
  }

  const deleteTodo = (todo) => {
    return api.delete(`/todos/${todo.id}`);
  }

  return {loadTodo, createTodo, updateTodo, deleteTodo};
}