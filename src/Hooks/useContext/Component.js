import React,{useContext} from "react";
import { ThemeContext } from "./App";

const Component=()=>{
    const theme = useContext(ThemeContext) //Get the value(theme) from the context
    const ThemeStyles = {
        backgroundColor: theme? '#333':'#CCC',
        color: theme? '#CCC' : '#333',
        padding: '2rem',
        margin: '2rem'
    }

    return(
        <div style={ThemeStyles}>From Component</div>
    )
}

export default Component;