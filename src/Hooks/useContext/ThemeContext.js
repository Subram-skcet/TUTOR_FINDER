import React,{createContext, useContext, useState} from "react"

const ThemeContext = createContext();

export function useTheme(){
    return useContext(ThemeContext);
}

export function ThemeProvider({children}){

    const [theme,setTheme] = useState(true)
    
    function toggleTheme(){
         setTheme(prevTheme => !prevTheme)
    } 

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
