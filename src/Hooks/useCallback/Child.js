import { useEffect } from "react";

const App  = ({Styles,count}) =>{
    useEffect(()=>{
        console.log('Rendering..');
    })
    return(
        <div style={Styles}>{count}</div>
    )
}

export default App;