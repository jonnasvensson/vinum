import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'


function Login() {
  const [state, setState] = useState(null);

  function getPosts() {
    console.log('button clicked');
    axios
      .get('http://localhost:9000/wp-json/wp/v2/vines') 
      .then(response =>{
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
                        <div className="title">Grape</div>
                        <div className="title">Country</div>
                    </div>
                    <div className="imgContainer">
                        <img src="" alt=""></img>
                    </div>
                </div>
                <div className="bottomContainer">
                    <div className="extrasGroup">
                        <div className="extrasContainer">
                            <div className="title">Description</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                        <div className="extrasContainer">
                            <div className="title">Comments</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                    </div>
                </div>
            </div>
            <div className="containerWine">
                <div className="topContainer">
                    <div className="infoGroup">
                        <div className="title">Name</div>
                        <div className="title">Grape</div>
                        <div className="title">Country</div>
                    </div>
                    <div className="imgContainer">
                        <img src="" alt=""></img>
                    </div>
                </div>
                <div className="bottomContainer">
                    <div className="extrasGroup">
                        <div className="extrasContainer">
                            <div className="title">Description</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                        <div className="extrasContainer">
                            <div className="title">Comments</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                    </div>
                </div>
            </div>

            <div className="containerWine">
                <div className="topContainer">
                    <div className="infoGroup">
                        <div className="title">Name</div>
                        <div className="title">Grape</div>
                        <div className="title">Country</div>
                    </div>
                    <div className="imgContainer">
                        <img src="" alt=""></img>
                    </div>
                </div>
                <div className="bottomContainer">
                    <div className="extrasGroup">
                        <div className="extrasContainer">
                            <div className="title">Description</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                        <div className="extrasContainer">
                            <div className="title">Comments</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                    </div>
                </div>
            </div>
            <div className="containerWine">
                <div className="topContainer">
                    <div className="infoGroup">
                        <div className="title">Name</div>
                        <div className="title">Grape</div>
                        <div className="title">Country</div>
                    </div>
                    <div className="imgContainer">
                        <img src="" alt=""></img>
                    </div>
                </div>
                <div className="bottomContainer">
                    <div className="extrasGroup">
                        <div className="extrasContainer">
                            <div className="title">Description</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                        <div className="extrasContainer">
                            <div className="title">Comments</div>
                            <div className="content">Cheeseburger fondue who moved my cheese. Hard cheese hard cheese cauliflower cheese emmental st. agur blue cheese pecorino cream cheese ricotta. Mascarpone queso rubber cheese cottage cheese cheesecake port-salut airedale airedale. Port-salut cream cheese airedale manchego brie stilton cheeseburger the big cheese. The big cheese.</div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>    
        <Footer />
    </main>
  );
}

export default Login;
