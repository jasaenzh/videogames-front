import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames, getGenres, GamesPerGenres, filterApiBd, orderAscDes, orderByRaiting } from "../redux/actions";
import { Link } from 'react-router-dom';
import GameCard from "./GameCard";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import './css/Home.css'

export default function Home() {

    // Delcaro el dispathc
    const dispatch = useDispatch();


    const allVideoGames = useSelector((state) => state.videogames)
    // const allGenres = useSelector((state) => state.genres)
    const filterGenresVideoGames = useSelector((state) => state.allGenres)

    // ----  DEFINO VARIOS ESTADOS LOCALES  ---------

    //0 - Es un estado local vacio
    const [order, setOrden] = useState('')

    console.log(order)

    // 1 - Un Estado local con la pagina Actual y un Estado que Setee la Pagina actual
    const [currentPages, setCurrentPage] = useState(1)

    // console.log("Current Page: ", currentPages)

    // 2 - Un Estado local que me va a decir cuantos Video Juegos tengo por pagina Y Seteo los video Juegos que requiero por Pagina
    const [videoGamesPerPage] = useState(15)

    // console.log("videoGamesPerPage", videoGamesPerPage)

    // 3 - Este estado es para ver el ultimo Video Juego
    const indexOfLastVideoGame = currentPages * videoGamesPerPage


    // console.log("Este estado es para ver el ultimo Video Juego", currentPages, " * ", videoGamesPerPage, " = ", indexOfLastVideoGame)

    // 4 - Este estado es para ver el indice del primer personaje
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage
    // console.log("Este estado es para ver el indice del primer personaje: ", indexOfLastVideoGame, " - ", videoGamesPerPage, " = ", indexOfFirstVideoGame)

    // 5 - Este estado muestra los personajes que estan en la pagina actual
    const currentVideoGames = allVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
    // console.log("Este estado muestra los personajes que estan en la pagina actual: [", indexOfFirstVideoGame, " , ", indexOfLastVideoGame, "]")

    // ----------- ************ ---------
    //PAGIGANDO Le paso un numero de la pagina, seteo la  pagina en ese numero de pagina
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    // ----------- ************ ---------
    // Los useEfeect
    useEffect(() => {
        dispatch(getVideoGames());
        dispatch(getGenres());

    }, [dispatch])


    // ----------- ************ ---------
    // Los handler

    //Con esta funcion llamo (refresco) todos los Video Juegos
    const handleClickRefreh = (e) => {

        e.preventDefault();
        dispatch(getVideoGames())
        setCurrentPage(1);
        // console.log("hola2")
    }


    // Con esta funcion estoy filtrando por generos
    function handleGamesPerGenres(event) {

        dispatch(getVideoGames)
        dispatch(GamesPerGenres(event.target.value))
        setCurrentPage(1);

    }

    function handlefilterApiBd(event) {

        dispatch(getVideoGames)
        dispatch(filterApiBd(event.target.value))
        setCurrentPage(1);

    }

    function handleorderAscDes(event) {
        event.preventDefault();
        dispatch(orderAscDes(event.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${event.target.value}`)


    }

    function filterObrderByRaiting(event) {
        event.preventDefault();
        dispatch(orderByRaiting(event.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${event.target.value}`)


    }

    // ----------- ************ ---------
    // Renderizado

    return (
        <div className="flexHome">
            <h1 className="tituloHome">Video Juegos</h1>
            <nav className="divBotonesHome">
                <button onClick={(e) => { handleClickRefreh(e) }}>Refrescar</button>
                <Link to='/videogame'>
                    <button>Crear</button>
                </Link>

                <SearchBar></SearchBar>

            </nav>

            <div>
                <div className="filtrosHome">
                    <div>
                        <h4 className="titulosFiltos">Generos</h4>
                        {/* Aca Va el listado de los Generos */}
                        <select className="cajaIngrDatosLabelEInputSelect" onChange={event => handleGamesPerGenres(event)}>
                            <option name="Todos">Todos</option>
                            {
                                filterGenresVideoGames.map(genre => (
                                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                                ))
                            }
                        </select>

                    </div>

                    <div>

                        <h4 className="titulosFiltos">Api o BD</h4>

                        {/* Aca Va el listado Creados por BD o por Nosotros */}
                        <select className="cajaIngrDatosLabelEInputSelect" onChange={event => handlefilterApiBd(event)}>
                            <option value="allGames">Todos</option>
                            <option value="apiGames">Api</option>
                            <option value="bdGames">BD</option>
                        </select>

                    </div>

                    <div>
                        <h4 className="titulosFiltos">Ascendente o Descendete</h4>
                        {/* Aca filtro por orden */}
                        <select className="cajaIngrDatosLabelEInputSelect" onChange={event => handleorderAscDes(event)}>
                            <option value='vacioAscDes'> -- </option>
                            <option value='ascendente'>A - Z</option>
                            <option value='descendente'>Z - A</option>
                        </select>

                    </div>

                    <div>
                        <h4 className="titulosFiltos"> Rating </h4>
                        {/* Aca filtro por orden */}
                        <select className="cajaIngrDatosLabelEInputSelect" onChange={event => filterObrderByRaiting(event)}>
                            <option value='vacioRaiting'> -- </option>
                            <option value='raitingmenor'>Mayor a Menor</option>
                            <option value='raitingmayor'>Menor a Mayor</option>
                        </select>

                    </div>


                </div>
                <br />

                <Paginated
                    videoGamesPerPage={videoGamesPerPage}
                    allVideoGames={allVideoGames.length}
                    paginated={paginated}
                    currentPages={currentPages}
                />

                {/* Aca se renderizan las cards */}
                <div className="cajaCards">

                    {
                        currentVideoGames === "404" ?
                            <h1>Video Juego No Encontrado</h1> :
                            currentVideoGames.length ? currentVideoGames?.map(game => {
                                return (

                                    <GameCard key={game.id} value={game.id} background_image={game.background_image} name={game.name} genres={game.genres} platforms={game.platforms.join(" - ")} description={game.description} />


                                )
                            })
                                : <h4>Cargando...</h4>
                    }
                </div>

            </div>
        </div >
    )
}


