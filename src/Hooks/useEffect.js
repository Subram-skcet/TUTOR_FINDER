import { useEffect, useState } from "react";

const App = ()=>{
    const [categories,setCategories] = useState('posts')
    
    const [items,setItems] = useState([])
    // useEffect(()=>{
    //     console.log("Rendereing");
    // }) //run each rendering

    // useEffect(()=>{
    //     console.log("Rendereing");
    // }) //run only when component mounted

    // useEffect(()=>{
    //     console.log(`Changed to ${categories}`);
    // },[categories])  //run only the value specified in the list changes

    // useEffect(()=>{
    //     console.log("Rendereing");

    //     return ()=>{
    //         console.log('Demounted');
    //     }
    // }) //run the return function when component demounted
    
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${categories}`)
            .then(response => response.json())
            .then(json => setItems(json))
    },[categories])



    return(
        <>
         <div>
            <button onClick={()=>setCategories('posts')}>Posts</button>
            <button onClick={()=>setCategories('users')}>Users</button>
            <button onClick={()=>setCategories('comments')}>Comments</button>
        </div>
        {categories}
            {items.length >0 && items.map(item=>{
                return <pre>{JSON.stringify(item)}</pre>
            })}
        </>
    )
}

export default App;