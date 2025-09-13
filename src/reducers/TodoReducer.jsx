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
      return state.filter((value) => value.id !== action.payload.id);
    case "ADD_TODO":
      const newId =
        state.length > 0 ? Math.max(...state.map((item) => item.id)) + 1 : 1;
      const newTodo = {
        id: newId,
        text: action.payload.text,
        done: false,
      };
      return [...state, newTodo];
    default:
      return state;
  }
}
