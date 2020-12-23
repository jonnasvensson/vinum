import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Login from './components/Login'

function App() {
  const [state, setState] = useState(null);

  function getPosts() {
    console.log('button clicked');
    axios
      .get('http://localhost:9000/wp-json/wp/v2/vines') 
      .then(response =>{
        setState(response.data)
      })
  }

  console.log('STATE', state);


  return (
    <div className="App">
      <button onClick={getPosts}>posts</button>
      <Login />
    </div>
  );
}

export default App;
