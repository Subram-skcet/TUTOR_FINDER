import { ACTIONS } from "./ComplexApp";

const Todo = ({todo , dispatch}) => {
    return (
      <>
         <p style={{color:todo.complete? '#AAA': '#000'}}>{todo.name}</p>
        <button onClick={()=>dispatch({type:ACTIONS.DELETE_TODO,payload:{id:todo.id}})}>Delete</button>
        <button onClick={()=>dispatch({type:ACTIONS.SELECT_TODO,payload:{id:todo.id}})}>Toggle</button>
      </>
    );
  };
export default Todo