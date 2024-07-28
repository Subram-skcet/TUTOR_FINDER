import { useEffect, useRef, useState } from "react"

const App = () =>{
    //1. Access the DOM element like document.QuerySelector in js

    // const InputRef = useRef('')
    
    // const Focus = () =>{
        // console.log(InputRef.current);
        // InputRef.current.focus()
    // }
    // return (
    //     <>
    //         <input type="text" ref={InputRef}/>
    //         <button onClick={Focus}>Focus</button>
    //     </>
    // )

    //2. Data Persistency between renders
    const prevname = useRef()
    const [name,setName] = useState()

    useEffect(()=>{
        prevname.current=name
    },[name])

    return(
        <>
          <input value={name} onChange={e=>setName(e.target.value)}/>
          <p>My name is {name} and it is used to be {prevname.current}</p>
        </>
    )
}

export default App;