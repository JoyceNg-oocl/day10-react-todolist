export function todoReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "ADD_TODO":
      return [...state, action.payload];
    case "LOAD_TODOS":
      return action.payload;
    default:
      return state;
  }
}
