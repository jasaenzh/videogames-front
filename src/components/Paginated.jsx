import React from "react";

export default function Paginated({ videoGamesPerPage, allVideoGames, paginated, currentPages }) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil(allVideoGames / videoGamesPerPage); i++) {
        pageNumber.push(i + 1)
    }

    function handlerFlechas(event) {
        // console.log(event.target.name)
        event.target.name === "atras" && currentPages !== 1 && paginated(currentPages - 1)
        // console.log(currentPages)
        // console.log("AllVideoGames", allVideoGames)
        // console.log("Video Game Per Page", videoGamesPerPage)
        // console.log(" Todos los Video Juegos", allVideoGames)
        // console.log("Total: ", Math.ceil((allVideoGames / videoGamesPerPage)))
        event.target.name === "adelante" && currentPages !== Math.ceil((allVideoGames / videoGamesPerPage)) && paginated(currentPages + 1)

    }

    // console.log(currentPages)

    //Componente que renderiza los numeros
    return (
        <nav>
            <ul className="paginated">
                <button name="atras" onClick={handlerFlechas}> Anterior </button>
                {
                    pageNumber && pageNumber.map(number => (

                        <button className={`number ${number === currentPages ? "currentPages" : ""}`} key={number} onClick={() => paginated(number)} id="botonPaginado" > {number} </button>

                    ))
                }
                <button name="adelante" onClick={handlerFlechas}> Proximo </button>
            </ul>
        </nav>
    )
}