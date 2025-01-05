
export const initialState = {
    logged:false,
    logged_as:null,
    asTeacher:{
       _id:'',
       profilepic:'',
       name:'',
       about:'',
       mobileno:'',
       numOfReviews:0,
       numOfTutions:0,
       qualification:'',
       subjects:[],
       year_of_exp:0,
       district:'',
       state:'',
       averageRating:0,
       email:''
    },
    asStudent:{
       _id:'',
       profilepic:'',
       img:'',
       name:'',
       likedReviews:[],
       dislikedReviews:[],
       favouriteTutions:[],
       email:''
    }
  };
  
  const reducer = (state, action) => {
    console.log(state,action);
    // Action -> type, [playload]
    switch (action.type) {
        case "LOG_USER":
        return {
          ...state,
          logged: action.payload,
        };
        case "LOGGED_USER":
        return {
          ...state,
          logged_as: action.payload,
        };
        case "SET_TEACHER":
        return {
          ...state,
          asTeacher:action.payload,
        };
        case "SET_STUDENT":
          return {
            ...state,
            asStudent:action.payload
          };
        case "LOG_OUT":
          return initialState
  
      default:
        return state;
    }
  };
  export default reducer;