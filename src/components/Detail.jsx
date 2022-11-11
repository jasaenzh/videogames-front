import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getVideoDetail, getVideoGames, cleanState } from "../redux/actions";
import { useEffect } from "react";
import './css/Detail.css'

export default function Detail(props) {

    // console.log("Estas son las props: ", props.match.params)


    // Delcaro el dispathc
    const dispatch = useDispatch();
    const history = useHistory()


    // ----------- ************ ---------
    //Los useEfeect
    let id = props.match.params.id;
    useEffect(() => {
        // console.log(getVideoDetail)
        dispatch(getVideoDetail(id));
        dispatch(getVideoGames());
        return function clean() {
            dispatch(cleanState())
        }
    }, [dispatch, id])




    const theVideoGame = useSelector((state) => state.detail)
    const theGenres = useSelector((state) => state.videogames)

    // console.log("The Video Game", theVideoGame)


    const idVideoGames = theGenres.map(element => element);



    const idFiltrado = idVideoGames.filter(idElement => idElement.id === id);



    const filerGenre = theGenres.filter(element => element.id === Number(id))



    const backHandler = (event) => {
        event.preventDefault();
        history.goBack()

    }

    return (
        <div className="cajaDetalleTitulo">
            <div className="cajaTitulo">
                <h1>Detalle</h1>
            </div>
            <div className="cajaDatos">
                <div>
                    <img src={theVideoGame && theVideoGame.background_image} id="imagenCardDetail" alt="img" width="400px" height="450px" />
                </div>
                <div className="divDetalleDatos">
                    <div >
                        <p id="tituloDetalle">{theVideoGame && theVideoGame.name}</p>
                    </div>

                    <div>
                        {
                            theVideoGame ?
                                <div>
                                    <div>
                                        {
                                            id.length > 6 ?
                                                <div>
                                                    {
                                                        idFiltrado.map(genero => genero.genres.map(gen => <div className="generosYPlataformas"><p> {gen.name} </p> </div>))
                                                    }
                                                </div>

                                                :
                                                filerGenre.map(genero => <div className="generosYPlataformas"><span className="letrasGeneros"> {genero.genres} </span> </div>)
                                        }
                                    </div>
                                </div>
                                : <p>Cargando</p>
                        }
                    </div>
                    <div id="divDescripcionDetalle">
                        <p id="pDescripcionDetalle">{theVideoGame && theVideoGame.description}</p>
                    </div>

                    <div className="divRelaseDetalle">
                        <span className="letrasRelease">{theVideoGame && theVideoGame.released}</span>
                    </div>

                    <div className="divRaitingDetalle">
                        <span className="letrasRelease">{theVideoGame && theVideoGame.rating}</span>
                    </div>

                    <div className="divPlatformsDetalle">
                        <span className="letrasRelease">{theVideoGame && theVideoGame.platforms}</span>
                    </div>



                </div>
            </div>
            <nav className="cajaPieDePagina">
                <button onClick={backHandler}>Atras</button>
            </nav>

        </div>
    )


}





