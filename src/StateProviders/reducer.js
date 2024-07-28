export const initialState = {
    logged:false
  };
  
  const reducer = (state, action) => {
    // Action -> type, [playload]
    switch (action.type) {
        case "LOG_USER":
        return {
          ...state,
          logged: action.logged,
        };
  
      default:
        return state;
    }
  };
  export default reducer;