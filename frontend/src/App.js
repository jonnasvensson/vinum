import './App.scss';
import React from 'react';
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/Add'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Add} />
      </Router>
    </div>
  );
}

export default App;
