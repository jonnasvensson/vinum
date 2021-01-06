import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Circle from './Circle'
import AriaModal from 'react-aria-modal';


export default function PopupEdit(deactivateModal) {

    return (
        <AriaModal
            titleText="demo one"
            onExit={deactivateModal}
            className="modal"
        >
            <main className="popup">
                <div className="containerWine">
                    <div className="topContainer">
                        <div className="infoGroup">
                            <div className="title">Name</div>
                            <div className="content"></div>
                            <div className="title">Grape</div>
                            <div className="content"></div>
                            <div className="title">Country</div>
                            <div className="content">
                                {/* {
                                !vine.acf.country ? vine.acf.country === [] :
                                    vine.acf.country.map(x => {
                                        return <div key={x.ID}>{x.post_title}</div>
                                    })
                            } */}
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src="" alt=""></img>
                        </div>
                    </div>
                    <div className="bottomContainer">
                        <div className="extrasGroup">
                            <div className="extrasContainer">
                                <div className="title">Description</div>
                                <div className="content"></div>
                            </div>
                            <div className="buttonContainer">
                                <button className="buttonEdit" onClick={() => deactivateModal}>close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AriaModal>
    );
}
