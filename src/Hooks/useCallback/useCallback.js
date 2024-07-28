// useCallback hook is primarily concerned with optimizing the performance
//  of your components by memoizing callback functions. In React, when a 
//  component re-renders, its child components also re-render. If these child components 
// receive callback functions as props, they might trigger unnecessary 
// re-renders if those callback functions are recreated in every render cycle.

//here in this Example when we use useCallback instaed of useMemo it throws error 
//since it return memoized callback function to the child
// ()=>{
        
//     return {

//         width:'100px',
//         height:'100px',
//         backgroundColor:theme?'black':'white',
//         color:theme?'gray':'black',
//         padding:'10px'
//     }
// }
// instead of the meoized value
// return {

//     width:'100px',
//     height:'100px',
//     backgroundColor:theme?'black':'white',
//     color:theme?'gray':'black',
//     padding:'10px'
// }

// which useMemo does
//so use useCallback in the parentComponent which sends the function having parameter 
//to child component to avoid unnecessary re render

//refer this article https://www.linkedin.com/pulse/exploring-differences-between-usememo-usecallback-hooks-rahul-saxena#:~:text=useMemo%20is%20used%20to%20memoize,and%20optimizing%20component%20re%2Drenders.

// useMemo: Returns and stores the calculated value of a function in a variable
// useCallback: Returns and stores the actual function itself  in a variable

import { useEffect, useState,useMemo, useCallback, Component } from "react"
import Child from './Child'

const App =()=>{
    const [count,setCount] = useState(1)
    const [theme,setTheme] = useState(true)

    const HandleTheme = () =>{
        setTheme(prevTheme => !prevTheme)
    }
    const update = () =>{
        
        setCount(prevCount => prevCount*5)
    }

    const downdate = () =>{
        setCount(prevCount => prevCount/5)
    }
    const Styles =useMemo(()=>{
        
        return {

            width:'100px',
            height:'100px',
            backgroundColor:theme?'black':'white',
            color:theme?'gray':'black',
            padding:'10px'
        }
    },[theme])
    
    useEffect(()=>{
            console.log('Theme is changing');
    },[Styles])

    return(
        <>
        <button onClick={()=>HandleTheme()}>Select theme</button>
          <button onClick={()=>update()}>Update</button>
             <Child Styles={Styles} count={count}/>
          <button onClick={()=>downdate()}>Downdate</button>
        </>
    )
}

export default App;