import Component from "./updatedComponent";
import { ThemeProvider } from "./ThemeContext";

const UpdatedApp =() =>{
     return(
     <ThemeProvider>
         <Component/>
     </ThemeProvider>
          );
}

export default UpdatedApp;