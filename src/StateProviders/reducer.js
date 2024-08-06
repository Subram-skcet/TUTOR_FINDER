export const initialState = {
    logged:false,
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
       img:'',
       name:'',
       likedReviews:[],
       dislikedReviews:[],
       favouriteTutions:[]
    }
  };
  
  const reducer = (state, action) => {
    // Action -> type, [playload]
    switch (action.type) {
        case "LOG_USER":
        return {
          ...state,
          logged: action.logged,
        };
        case "SET_TEACHER":
        return {
          ...state,
          asTeacher:action.payload,
        };
  
      default:
        return state;
    }
  };
  export default reducer;