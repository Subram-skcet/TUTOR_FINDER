import { useReducer, useState } from "react"
import Todo from "./Todo"

export const ACTIONS = {
    ADD_TODO : 'add',
    DELETE_TODO : 'delete',
    TOGGLE_TODO : 'complete',
    SELECT_TODO : 'select'
}

function reducer(state,action){

   switch(action.type){
      case ACTIONS.ADD_TODO:
         return [...state, newTodo(action.payload.name)];

      case ACTIONS.DELETE_TODO:
        return state.filter(todo => todo.id !== action.payload.id);

      case ACTIONS.SELECT_TODO:
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : todo
            );
     default:
          return state
   }
}

function newTodo(name){
    return {id:Date.now(), name:name, complete:false}
}

const App= () =>{
       const [todo,dispatch] = useReducer(reducer,[])
       const [name,setName] = useState('')

       const handleSubmit = (e)=>{
              e.preventDefault()
            dispatch({type:ACTIONS.ADD_TODO,payload:{name:name}})
            setName('')
       }
       return(
            <>
            <form onSubmit={handleSubmit}>
              <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
            </form>
            {todo.map(todo => {
               return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
            })}
            </>
       )
}

export default App;