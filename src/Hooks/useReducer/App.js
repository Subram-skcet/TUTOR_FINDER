// useReducer accepted two thing as parameter
//       1) reducer function
//       2) initial state (mostly object)
// this useReducer return two things
//       1) current state (object) (from reducer function)
//       2) dispatch (a function to update the state)

// the reducer function accept two thing as input
//       1) state (object)
//       2) action (object)

// the action usually contains two fields
// action ={
//     type: 'Type of an event occured'
//     payload: 'Values hold for updation'
// }

import React,{useState,useReducer} from "react"

function reducer(state,action){
    switch(action.type){
        case 'increment':
          return {count:state.count+1}
        case 'decrement':
            return {count:state.count-1}
         default:
            return state;
    }
}

const App = () =>{
    
    const [state,dispatch] = useReducer(reducer,{count:0})

    const increment=()=>{
        dispatch({type:'increment'})
    }

    const decrement=()=>{
        dispatch({type:'decrement'})
    }

   return(
        <>
          <button onClick={increment}>+</button>
          {state.count}
          <button onClick={decrement}>-</button>
        </>
   )
}

export default App;