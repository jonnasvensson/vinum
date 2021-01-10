import './App.scss';
import Home from './components/Home'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

const API_jwt = "http://localhost:9000/wp-json/jwt-auth/v1/token";

function App() {
  const [token, setToken] = useState("");
  const [login, setLogin] = useState({
    username: "vinum",
    password: "vinum"
  });

  useEffect(() => {
    getToken();
  })

  function getToken() {
    axios
      .post(API_jwt, {
        username: login.username,
        password: login.password
      })
      .then(resp => {
        setToken(resp.data.token);
      })
  }

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={() => (
          <Home
            token={token}
          />
        )}
        />
      </Router>
    </div>
  );
}

export default App;