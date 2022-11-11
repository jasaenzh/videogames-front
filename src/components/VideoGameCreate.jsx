import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { addVideoGame, getGenres, } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './css/VideoGameCreate.css'



export default function Home() {

    const dispatch = useDispatch();
    const history = useHistory()

    // ------Estados Locales------//
    const [form, setForm] = useState({
        name: "",
        description: "",
        released: undefined,
        rating: undefined,
        genres: [],
        platforms: [],
    })
    // const [genres, setGenres] = useState([])
    // const [platforms, setPlatforms] = useState([])
    const [error, setError] = useState("")

    // ---- UseEfect ---- //

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])


    // ------ Manejadores de Estados ------//
    const nameChangeHandler = (event) => {
        const nameValue = event.target.value
        let letras = /^[ a-zA-ZÀ-ÿ 0-9.]+$/;

        if (!letras.test(nameValue)) {
            setError([...error, "Nombre no permite Caracter Especial"])
        } else if (!form.name) {
            setError("Nombre no puede estar vacio")
        } else {
            setError("")
        }
        setForm({ ...form, name: nameValue });

    }

    const descriptionChangeHandler = (event) => {

        const descriptionValue = event.target.value;

        setForm({ ...form, description: descriptionValue });
    }

    const releasedChangeHandler = (event) => {
        const releasedValue = event.target.value;

        setForm({ ...form, released: releasedValue });
    }

    const ratingChangeHandler = (event) => {
        const raitingValue = event.target.value;
        if (!(raitingValue >= 0 && raitingValue <= 5)) {
            setError([...error, "Debe de ser un valor entre 0 y 5"])
        } else {
            setError("")
        }
        setForm({ ...form, rating: raitingValue });
    }

    const genresChangeHandler = (event) => {
        if (!form.genres.includes(event.target.value)) {
            setForm({
                ...form,
                genres: [...form.genres, event.target.value]
            });
        }
    }

    const platformsChangeHandler = (event) => {
        if (!form.platforms.includes(event.target.value)) {
            setForm({
                ...form,
                platforms: [...form.platforms, event.target.value]
            });
        }

    }


    const backHandler = (event) => {
        event.preventDefault();
        history.goBack()

    }

    const deletePlaformsHandler = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        console.log(event.target.value)
        form.platforms.map(ele => console.log(ele))
        setForm({
            ...form,
            platforms: form.platforms.filter(elemet => event.target.id !== elemet)
        });
    }

    const deleteGenresHandler = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        console.log(event.target.value)
        form.genres.map(ele => console.log(ele))
        setForm({
            ...form,
            genres: form.genres.filter(elemet => event.target.id !== elemet)
        });
    }

    const submitHandle = (event) => {

        event.preventDefault();
        console.log(form)
        dispatch(addVideoGame(form))
        history.push("/home")

    }

    const filterGenresVideoGames = useSelector((state) => state.allGenres)


    // ------ Renderizado ------//
    return (


        <form onSubmit={submitHandle}>

            <div className="cajaFormulaio">
                <div className="cajaTitulo">

                    <h1 className="cajaTituloHuno">Crear Video Juego</h1>

                </div>

                <div className="cajaDatos">
                    <div className="cajaIngrDatos">

                        <div className="cajaIngrDatosLabelEInput">
                            <label className="cajaIngrDatosLabelEInputLabel">Nombre: </label>
                            <input className="cajaIngrDatosLabelEInputInput" type="text" onChange={nameChangeHandler} value={form.name}></input>
                        </div>

                        <div className="cajaIngrDatosLabelEInput">
                            <label className="cajaIngrDatosLabelEInputLabel">Descripción:</label>
                            <textarea type="text" className="cajaIngrDatosLabelEInputInput" onChange={descriptionChangeHandler} value={form.description}></textarea>
                        </div>

                        <div className="cajaIngrDatosLabelEInput">
                            <label className="cajaIngrDatosLabelEInputLabel" >Fecha de lanzamiento:</label>
                            <input type="date" className="cajaIngrDatosLabelEInputInput" id="textoFechaLanzamiento" onChange={releasedChangeHandler} value={form.released}></input>
                        </div>

                        <div className="cajaIngrDatosLabelEInput">
                            <label className="cajaIngrDatosLabelEInputLabel">Rating:</label>
                            <input type="number" className="cajaIngrDatosLabelEInputInput" onChange={ratingChangeHandler} value={form.rating}></input>
                        </div>

                        <div className="cajaIngrDatosLabelEInput">
                            <label className="cajaIngrDatosLabelEInputLabel">Generos</label>
                            <select name="" className="cajaIngrDatosLabelEInputSelect" id="" onChange={genresChangeHandler} value={form.genres} >
                                <option value="Vacio">Seleccionar</option>
                                {
                                    filterGenresVideoGames.map(genre => (
                                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="cajaIngrDatosLabelEInput">
                            <label className="cajaIngrDatosLabelEInputLabel">Plataformas</label>
                            <select name="" className="cajaIngrDatosLabelEInputSelect" id="" onChange={platformsChangeHandler} value={form.platforms}>
                                <option value="Vacio">Seleccionar</option>
                                <option value="PC">PC</option>
                                <option value="Nintendo">Nintendo</option>
                                <option value="Nintendo switch">Nintendo switch</option>
                                <option value="Xbox 360">Xbox 360</option>
                                <option value="Play Station">Play Station</option>
                                <option value="Play Station 2">Play Station 2</option>
                                <option value="Play Station 3">Play Station 3</option>
                                <option value="Play Station 4">Play Station 4</option>
                                <option value="Xbox One">Xbox One</option>
                                <option value="Xbox Series">Xbox Series</option>
                            </select>
                        </div>

                    </div>

                    <div className="cajaIngrDatos">

                        <div className="cajaIngrDatosLabelEInput">

                            <div className="plaformasDiv">
                                <p>Generos</p>
                                <div>
                                    {
                                        form.genres.map(elemet => <div><span>{elemet}</span><button onClick={deleteGenresHandler} id={elemet}>x</button></div>)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="cajaIngrDatosLabelEInput">
                            <div className="plaformasDiv">
                                <p>Plataformas</p>
                                <div>
                                    {
                                        form.platforms.map(elemet => <div><span>{elemet}</span><button onClick={deletePlaformsHandler} id={elemet}>x</button></div>)
                                    }

                                </div>

                            </div>
                        </div>

                        <div className="cajaErrores">
                            {error && <p>{error}</p>}
                        </div>

                    </div>
                </div>

                <nav className="cajaBarraBotones">

                    <button onClick={backHandler}>Atras</button>

                    <button type="submit" className="botonCrearVideoGame" disabled={(!form.name || !form.description || !form.released || !form.rating || !form.platforms.length || error) ? true : false}>CREAR</button>

                </nav>

            </div>

        </form >
    )
}

