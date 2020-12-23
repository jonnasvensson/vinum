import '../App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [state, setState] = useState(null);

  function handleLogin(e) {
      e.preventDefault();
  }

  return (
    <div className="login">
        <div className="title">Login</div>
        <form className="form" onSubmit={handleLogin}>
            <div className="titleAndInputGroup">
                <div className="title">Username</div>
                <input className="input" />
            </div>
            <div className="titleAndInputGroup">
                <div className="title">Password</div>
                <input className="input" />
            </div>
            <div className="buttonContainer">
                <input type="submit" value="Login" className="button"/>
            </div>    
        </form>
        <div className="registerContainer">
            <div>Register?</div>
        </div>
    </div>
  );
}

export default App;
