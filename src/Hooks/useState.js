import React,{ useState } from "react"
const App = ()=>{

  const [state,setState]=useState({name:'',age:0})
   const increment = ()=>{
      setState(prevState => {
        return {...prevState,age:prevState.age+1}
      })
   }

   const decrement = ()=>{
       setState(prevState => {
          return {...prevState,age:prevState.age-1}
       })
   }

      return(
        <div>
        <button onClick={increment}>+</button>
        {state.age}
        <button onClick={decrement}>-</button>
        </div>
      )
}

export default App