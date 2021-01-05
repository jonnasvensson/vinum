import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header'


export default function Add( token ) {
    const [input, setInputs] = useState({
        name: "", 
        grape: "",
        country: "",
        description: "",
        comments: ""
    });
    const [countries, setCountries] = useState([]);

    const getAllCountries = () => {
        axios
            .get('http://localhost:9000/wp-json/wp/v2/countries')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(() => {
        getAllCountries();
    }, [])


    function handleChange(e) {
        const value = e.target.value;
        setInputs({ 
            ...input,
            [e.target.name]: value
        });
    }

    function handleAdd() {
        let item = {
            title: input.name,
            content: "",
            status: "publish",
            fields: {
                vine: input.name,
                grape: input.grape,
                description: input.description,
            }
        }
        let auth = token.token
        axios
            .post('http://localhost:9000/wp-json/wp/v2/vines', item, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
    }

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
                            <input 
                                className="input" 
                                name="name"
                                onChange={handleChange}
                                value={input.name} />
                            <div className="title">Grape</div>
                            <input 
                                className="input"
                                name="grape"
                                value={input.grape}
                                onChange={handleChange}
                                 />
                            <div className="title">Country</div>
                            <input 
                                className="input"
                                name="country"
                                value={input.country}
                                onChange={handleChange}
                             />
                        </div>
                        <div className="imgContainer">
                            <img src="" alt=""></img>
                        </div>
                    </div>
                    <div className="bottomContainer">
                        <div className="extrasGroupAdd">
                            <div className="extrasContainer">
                                <div className="title">Description</div>
                                <textarea 
                                    id="story" 
                                    rows="3"
                                    name="description"
                                    value={input.description}
                                    onChange={handleChange}    
                                    ></textarea>
                            </div>
                            <div className="__extrasContainer">
                                <div className="commentsContainer">
                                    <div className="title">Comments</div>
                                    <textarea 
                                        id="story" 
                                        rows="3"
                                        name="comments"
                                        value={input.comments}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="buttonContainer">
                                    <button className="button" onClick={handleAdd}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}