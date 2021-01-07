import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AriaModal from 'react-aria-modal';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';


export default function PopupEdit({
    deactivateModal,
    clickedVine,
    token,
    getAllVines
}) {
    const [input, setInputs] = useState({
        name: clickedVine.acf.vine,
        grape: clickedVine.acf.grape,
        description: clickedVine.acf.description,
        comments: ""
    });
    const [countries, setCountries] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => {
        getAllCountries();
        // filterAndFind();
    }, [])

    function handleChange(e) {
        const value = e.target.value;
        setInputs({
            ...input,
            [e.target.name]: value
        });
    }

    const getAllCountries = () => {
        axios
            .get('http://localhost:9000/wp-json/wp/v2/countries')
            .then(response => {
                setCountries(response.data)
            })
            .catch(err => {
                console.error(err);
            })
    }



    // var result = result1.filter(function (o1) {​​​​​
    // return result2.some(function (o2) {​​​​​
    // return o1.id === o2.id; // return the ones with equal id
    // }​​​​​);
    // }​​​​​);
    // // if you want to be more clever...
    // let result = result1.filter(o1 => result2.some(o2 => o1.id === o2.id));




    // const mappedCountries = countries.map(country => {
    //     return country.id
    // })

    // console.log(clickedVine);

    const country2 = clickedVine.acf.country.filter(x => {
        return countries.some(country => {
            return x.ID === country.id
        })
    })


    function handleSelect(e) {
        setSelected(e.target.value);
        console.log(e.target.value);
    }

    async function handleUpdate() {
        let updatedVine = {
            title: input.name,
            fields: {
                vine: input.name,
                grape: input.grape,
                description: input.description,
                country: [{ ID: selected }]
            }
        }
        console.log(updatedVine);
        await putAxios(clickedVine.id, updatedVine);
        deactivateModal();
        getAllVines();
    }

    async function putAxios(vineId, updatedVine) {
        await axios
            .put('http://localhost:9000/wp-json/wp/v2/vines/' + vineId, updatedVine, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <AriaModal
            titleText="demo one"
            onExit={deactivateModal}
            className="modal"
        >
            <main className="popup">
                <div className="containerWine">
                    <div className="buttonContainer">
                        <button className="buttonClose" onClick={deactivateModal}>
                            <CloseIcon />
                        </button>
                    </div>

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

                            <select onChange={handleSelect}>
                            <option className="title">Country</option>
                                {
                                    countries.map(country => {
                                        return <option value={country.id} key={country.id}>{country.acf.country}</option>
                                    })
                                }
                            </select>

                        </div>
                        <div className="imgContainer">
                            <img src="" alt=""></img>
                        </div>
                    </div>
                    <div className="bottomContainer">
                        <div className="extrasGroup">
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
                            <div className="buttonContainer">
                                <button className="buttonUpdate" onClick={handleUpdate}>
                                    <UpdateIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AriaModal>
    );
}
