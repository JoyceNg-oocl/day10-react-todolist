export function todoReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TODO":
      /// copy
      const newState = [...state];
      const id = action.payload.id;
      return newState.map((value) => {
        if (value.id === id) {
          return {
            id,
            text: value.text,
            done: !value.done,
          };
        }
        return value;
      });
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
