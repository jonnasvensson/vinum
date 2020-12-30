import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import Circle from './Circle'


export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllVines();
  }, [])

  const getAllVines = () => {
    axios
    .get('http://localhost:9000/wp-json/wp/v2/vines') 
    .then(response =>{
        setItems(response.data)
    })
  }

  console.log(items);

  const mapped = items.map(item => {
      if (!item) {
          return {}
      }
        return (        
                <div className="containerWine" key={item.id}>
                    <div className="topContainer">
                        <div className="infoGroup">
                            <div className="title">Name</div>
                            <div className="content">{item.acf.vine}</div>
                            <div className="title">Grape</div>
                            <div className="content">{item.acf.grape}</div>
                            <div className="title">Country</div>
                            <div className="content">{item.acf.country}</div>
                        </div>
                        <div className="imgContainer">
                            <img src={item.acf.image} alt=""></img>
                        </div>
                    </div>
                    <div className="bottomContainer">
                        <div className="extrasGroup">
                            <div className="extrasContainer">
                                <div className="title">Description</div>
                                <div className="content">{item.acf.description}</div>
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
            {mapped}
        </div>    
        <Circle />
    </main>
  );
}

