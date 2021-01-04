import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import Circle from './Circle'


export default function Home() {
    const [vines, setVines] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getAllVines();
        getAllCountries();
    }, [])

    const getAllVines = () => {
        axios
            .get('http://localhost:9000/wp-json/wp/v2/vines')
            .then(response => {
                setVines(response.data)
            })
    }

    const getAllCountries = () => {
        axios
            .get('http://localhost:9000/wp-json/wp/v2/countries')
            .then(response => {
                setCountries(response.data)
            })
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
                        {/* <div className="content">{vine.acf.country}</div> */}
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
            </div>
            <Header />
            <div className="mainContainer">
                {mappedVines}
            </div>
            <Circle />
        </main>
    );
}

