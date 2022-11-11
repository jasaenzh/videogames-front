import React, { useState } from "react";
import { getNameVideoGame } from "../redux/actions";
import { useDispatch, } from "react-redux";


export default function SearchBar() {

    //Guardo en la variable dispatch el useDispatch
    const dispatch = useDispatch();


    //Creo el estado local
    const [stateName, setName] = useState("");

    const inputVideoJuegoHandler = (event) => {
        event.preventDefault();
        // console.log(event.target.value)
        setName(event.target.value)
        // console.log(stateName)

    }

    const buscarVideoJuegoHandler = (event) => {
        event.preventDefault();
        dispatch(getNameVideoGame(stateName))

    }

    return (
        <div className="cajaBuscarVideoJuego">
            <input type="text" value={stateName} onChange={inputVideoJuegoHandler} placeholder="Buscar Video Juego" />
            <button type="submit" onClick={buscarVideoJuegoHandler} >Buscar</button>
        </div>
    )



}