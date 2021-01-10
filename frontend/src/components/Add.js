import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AriaModal from 'react-aria-modal';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


export default function Add({
    token,
    deactivateModal,
    getAllVines
}) {

    const [input, setInputs] = useState({
        name: "",
        grape: "",
        description: "",
        comments: ""
    });
    const [selected, setSelected] = useState();
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

    async function handleAdd() {
        await postVine();
        deactivateModal();
        getAllVines()
    }

    function handleChange(e) {
        const value = e.target.value;
        setInputs({
            ...input,
            [e.target.name]: value
        });
    }

    function handleSelect(e) {
        setSelected(e.target.value);
    }

    async function postVine() {
        let item = {
            title: input.name,
            content: "",
            status: "publish",
            fields: {
                vine: input.name,
                grape: input.grape,
                description: input.description,
                country: [{ ID: selected }]
            }
        }
        await axios
            .post('http://localhost:9000/wp-json/wp/v2/vines', item, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
            .then((resp) => {
                console.log(resp);
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
                            <div className="title">Country</div>
                            <select onChange={handleSelect}>
                                <option className="title"></option>
                                {
                                    countries.map(country => {
                                        return <option value={country.id} key={country.id}>{country.acf.country}</option>
                                    })
                                }
                            </select>

                        </div>
                    </div>
                    <div className="bottomContainer">
                        <div className="extrasGroupAdd">
                            <div className="extrasContainer">
                                <div className="title">Description</div>
                                <textarea
                                    id="story"
                                    rows="5"
                                    name="description"
                                    value={input.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <button className="buttonUpdate" onClick={handleAdd}>
                                <AddIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </AriaModal>
    );
}