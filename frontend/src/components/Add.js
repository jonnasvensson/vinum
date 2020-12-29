import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header'


export default function Add() {
    const [state, setState] = useState(null);

    function getPosts() {
        console.log('button clicked');
        axios
            .get('http://localhost:9000/wp-json/wp/v2/vines')
            .then(response => {
                setState(response.data)
            })
    }

    console.log('STATE', state);



    return (
        <main className="main">
            <div className="usernameContainer">
                <div className="title">Username</div>
            </div>
            <Header />
            <div className="mainContainer">
                <div className="containerWine">
                    <div className="topContainer">
                        <div className="infoGroup">
                            <div className="title">Name</div>
                            <input className="input" />
                            <div className="title">Grape</div>
                            <input className="input" />

                            <div className="title">Country</div>
                            <input className="input" />

                        </div>
                        <div className="imgContainer">
                            <img src="" alt=""></img>
                        </div>
                    </div>
                    <div className="bottomContainer">
                        <div className="extrasGroupAdd">
                            <div className="extrasContainer">
                                <div className="title">Description</div>
                                <div className="content"></div>
                            </div>
                            <div className="__extrasContainer">
                                <div className="commentsContainer">
                                    <div className="title">Comments</div>
                                    <textarea id="story" name="story" rows="3"></textarea>
                                </div>
                                <div className="buttonContainer">
                                    <input className="button" value="Add"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}