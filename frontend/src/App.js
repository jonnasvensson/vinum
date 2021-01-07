import './App.scss';
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import {
  BrowserRouter as Router,
  Redirect,
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

  function handleLogin(e) {
    e.preventDefault();
    if (token) {
      <Redirect to='/' />
    }

  }

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

  function handleChange(e) {
    const value = e.target.value;
    setLogin({
      ...login,
      [e.target.name]: value
    });
  }


  return (
    <div className="App">
      <Router>
      {   !token ?
        <div className="login">
          <div className="title">Sign in</div>
          <form className="form" onSubmit={handleLogin}>
            <div className="titleAndInputGroup">
              <div className="title">Username</div>
              <input
                className="input"
                name="username"
                type="text"
                value={login.username}
                onChange={handleChange}
              />
            </div>
            <div className="titleAndInputGroup">
              <div className="title">Password</div>
              <input
                className="input"
                name="password"
                type="password"
                value={login.password}
                onChange={handleChange}
              />
            </div>
            <div className="buttonContainer">
              <input type="submit" value="Sign in" className="button" />
            </div>
          </form>
          <div className="registerContainer">
            <div>Register?</div>
          </div>
        </div>
        : <Redirect to="/home" />}
        {/* <Route path="/login" component={() => (
          <Login
            token={token}
            setToken={setToken}
          />
        )}
        /> */}
        <Route exact path="/home" component={() => (
          <Home
            token={token}
          />
        )}
        />
        <Route path="/add" component={() => (
          <Add
            token={token}
          />
        )}
        />
        <Route path="/edit/:id" component={() => (
          <Edit
            token={token}
          />
        )}
        />
      </Router>
    </div>
  );
}

export default App;