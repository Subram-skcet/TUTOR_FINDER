import React from "react"
import { useTheme } from "./ThemeContext"

const Component = () =>{
    const {theme,toggleTheme} = useTheme()

    const ThemeStyles = {
        backgroundColor: theme? '#333':'#CCC',
        color: theme? '#CCC' : '#333',
        padding: '2rem',
        margin: '2rem'
    }

    return(
        <>
         <button onClick={toggleTheme} >Toggle Theme</button>
        <div style={ThemeStyles}>From Component</div>
        </>
    )
}

export default Component;