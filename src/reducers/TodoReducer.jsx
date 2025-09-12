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
            done: !value.done
          };
        }
        return value
      })
    default:
      return state;
  }
}