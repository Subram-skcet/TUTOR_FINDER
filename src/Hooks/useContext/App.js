import React,{ useState, createContext, useContext } from "react";
import Component from "./Component";

//useContext() main purpose is to avoid prop drilling

export const ThemeContext = createContext() 
//Gonna be the values(theme) Provider
//value accessor component must import these Theme Context

const App = () =>{
    const [theme,setTheme] = useState(true)

    function toggleTheme(){
         setTheme(prevTheme => !prevTheme)
    } 

    //Provide list of Children gonna use the value within Provider component

    return(
        <>
           <ThemeContext.Provider value={theme}>
            <button onClick={toggleTheme}>Toggle Theme</button>
               <Component/> 
               {/*instead of <Component theme={theme}/>  */}
           </ThemeContext.Provider>
        </>
    )
}

export default App;