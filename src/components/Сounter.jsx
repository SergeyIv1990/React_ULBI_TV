import React from 'react';

import {useState} from 'react';

function Сounter() {
  const [likes, setLikes] = useState(5)
  const [value, setValue] = useState("Text")

  function increment(){
    setLikes(likes+1)
  }
  function decrement(){
    setLikes(likes-1)
  } 

  return (
    <div className="counter">
      <h1>{likes}</h1>
      <h1>{value}</h1>
      <input 
        tupe="text" 
        value={value}
        onChange={event => setValue(event.target.value)}/>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    
    
    </div>  
    
    
    );
}

export default Сounter;
