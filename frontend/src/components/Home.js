import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import Circle from './Circle'
import { useHistory } from "react-router-dom";


export default function Home(token, setToken ) {
    const [vines, setVines] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getAllVines();
    }, [])

    const getAllVines = () => {
        axios
            .get('http://localhost:9000/wp-json/wp/v2/vines')
            .then(response => {
                setVines(response.data)
            })
    }
    
    function handleSignOut() {
        token = false;
        history.push('/')
    }

    const mappedVines = vines.map(vine => {
        if (!vine) {
            return {}
        }
        return (

            <div className="containerWine" key={vine.id}>
                <div className="topContainer">
                    <div className="infoGroup">
                        <div className="title">Name</div>
                        <div className="content">{vine.acf.vine}</div>
                        <div className="title">Grape</div>
                        <div className="content">{vine.acf.grape}</div>
                        <div className="title">Country</div>
                        {
                            !vine.acf.country ? vine.acf.country === [] && <div className="content"></div> : 
                                vine.acf.country.map(x => {
                                    return <div className="content" key={x.ID}>{x.post_title}</div>
                            })
                        }
                    </div>
                    <div className="imgContainer">
                        <img src={vine.acf.image} alt=""></img>
                    </div>
                </div>
                <div className="bottomContainer">
                    <div className="extrasGroup">
                        <div className="extrasContainer">
                            <div className="title">Description</div>
                            <div className="content">{vine.acf.description}</div>
                        </div>
                        <div className="extrasContainer">
                            <div className="title">Comments</div>
                            <div className="content"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <main className="main">
            <div className="usernameContainer">
                <div className="title">Username</div>
                <button onClick={handleSignOut}>Sign out</button>
            </div>
            <Header />
            <div className="mainContainer">
                {mappedVines}
            </div>
            <Circle />
        </main>
    );
}

