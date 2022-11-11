import React from "react";
import { Link } from 'react-router-dom';
import './css/LandingPage.css'

const LandingPage = () => {

    return (
        <div className="cajaLandingPage">
            <h1 className="textoLandinPage">Bienvenidos</h1>
            <Link to='/home'>
                <button className="botonLandingPage">INGRESAR</button>
            </Link>
        </div >
    )

}

export default LandingPage
