import React,{ useEffect, useState,useMemo} from "react"

const App =() =>{
   const [state,setState] = useState(1)
   const [dark,setDark] = useState(true)

   const handleItem = () =>{
      setState(prevState => prevState+1)
   }

    const Styles = useMemo(()=>{
        return{
            background: dark?'red':'pink',
            color:dark?'white':'red'
        } 
    },[dark])

    //Use Memo in your code when your dependencies of your useEffect is
    // an object like the below code and not for an useState variable 

    //Another use Case is to avoid running a complex function for every 
    //rendering  a Component it avoids by Caching the previous result and compare it with the new one 

    //One line of Usememo is used to avoid re rendering of a static thing to improve performance of our app

    useEffect(()=>{
      console.log("Theme is changing");
    },[Styles])

   return(
    <>
       <input type="number" value={state} onChange={e => setState(e.target.value)}/>
       <button onClick={handleItem}>Change state</button>
       <button onClick={()=>setDark(prevDark=>!prevDark)}>Change item</button>
       <div style={Styles}>{state}</div>
       
    </>
   )
}

export default App;