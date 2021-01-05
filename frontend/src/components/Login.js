import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

const API_jwt = "http://localhost:9000/wp-json/jwt-auth/v1/token";


function Login(token, {setToken}) {
    const [login, setLogin] = useState({
        username: "vinum",
        password: "vinum"
    });
  const [redirect, setRedirect] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        axios
            .post(API_jwt, {
                username: login.username,
                password: login.password
            })
            .then(resp => {
                setToken( resp.data.token );
            })
            if (token) {
                console.log(token);
                setRedirect( true )
            }
    }

    function handleChange(e) {
        const value = e.target.value;
        setLogin({
            ...login,
            [e.target.name]: value
        });
    }

    return (
        // redirect ? <Redirect to="/"/> : 
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
                        <input type="submit" value="Login" className="button" />
                    </div>
                </form>
                <div className="registerContainer">
                    <div>Register?</div>
                </div>
            </div>
    );
}

export default Login;
