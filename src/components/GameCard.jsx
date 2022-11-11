import React from "react";
import { Link } from 'react-router-dom';

export default function GameCard({ name, background_image, genres, platforms, value }) {

    // console.log(value)

    // console.log(genres)

    // console.log(rating)
    return (
        <div className="cajaCardsDiv">
            <Link to={`/detail/${value}`}>

                <img id="imagenCard" src={background_image} alt="img" width="300px" height="350px" />

                <h3 id="nameCard">{name}</h3>
                <div id="generoCard">
                    {
                        value.length > 6 ?
                            genres.map(gen => <span className="textGenreCards" key={Math.random()}>{gen.name} {genres.indexOf(gen) === (genres.length - 1) ? ' ' : ' - '}</span>)
                            : genres.map(gen => <span className="textGenreCards" key={Math.random()} >{gen} {genres.indexOf(gen) === (genres.length - 1) ? ' ' : ' - '} </span>)
                    }
                </div>
                <p className="textGenreCards" id="plaformsCard">{platforms}</p>


            </Link>
        </div>

    );

}