import '../App.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header'
import Circle from './Circle'
import { Link, useHistory } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import PopupEdit from './PopupEdit'
import DeleteIcon from '@material-ui/icons/Delete';
import Add from './Add'


export default function Home(token) {
    const [vines, setVines] = useState([]);
    const [users, setUsers] = useState([]);
    const [clickedVine, setClickedVine] = useState(null);
    const [modalActive, setModalActive] = useState(false)
    const [modalActiveAdd, setModalActiveAdd] = useState(false)
    let history = useHistory();

    useEffect(() => {
        getAllVines();
        getUser();
    }, [])

    const getUser = async () => {
        const data = await axios.get('http://localhost:9000/wp-json/wp/v2/users')
        setUsers(data.data);
    }

    const getAllVines = () => {
        axios
            .get('http://localhost:9000/wp-json/wp/v2/vines')
            .then(response => {
                setVines(response.data)
            })
    }

    const activateModalAdd = () => {
        setModalActiveAdd(true);
    }
    
    const activateModal = (vine) => {
        setClickedVine(vine);
        setModalActive(true);
    }

    const deactivateModal = () => {
        setModalActive(false);
        setModalActiveAdd(false);
    }

    const axiosDeleteAsync = async (vine) => {
        await axios.delete('http://localhost:9000/wp-json/wp/v2/vines/' + vine.id, 
        {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }) 
    } 

    
    const handleDelete = async (vine) => {
        await axiosDeleteAsync(vine)
        getAllVines();
    }

    // function handleSignOut() {
    //     token = false;
    //     history.push('/')
    // }

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
                        <div className="content">
                            {
                                !vine.acf.country ? vine.acf.country === [] :
                                    vine.acf.country.map(x => {
                                        return <div key={x.ID}>{x.post_title}</div>
                                    })
                            }
                        </div>
                    </div>
                    <div className="buttonGroup">
                    <div className="buttonContainer">
                            <button className="buttonEdit" onClick={() => handleDelete(vine)}>
                                <DeleteIcon />
                            </button>
                            <button className="buttonEdit" onClick={() => activateModal(vine)}>
                                <CreateIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bottomContainer">
                    <div className="extrasGroup">
                        <div className="extrasContainer">
                            <div className="title">Description</div>
                            <div className="content">{vine.acf.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <main className="main">
            {
                modalActive && 
                <PopupEdit 
                    deactivateModal={deactivateModal} 
                    clickedVine={clickedVine}
                    token={token}
                    getAllVines={getAllVines}/>
            }
            {
                modalActiveAdd && 
                <Add 
                    deactivateModal={deactivateModal}
                    token={token}
                    getAllVines={getAllVines}
                    /> 
            }
            {/* <div className="usernameContainer">
                {
                    users.map(user => {
                        return <div className="title" key={user.id}>{user.name}</div>
                    })
                }
                <button onClick={handleSignOut}>Sign out</button>
            </div> */}
            <Header />
            <div className="mainContainer">
                {mappedVines}
            </div>
            <Circle activateModalAdd={activateModalAdd}/>
        </main>
    );
}
