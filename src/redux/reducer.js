import {
    GET_VIDEOGAMES,
    FILTER_GAMES_BY_GENRES,
    GET_GENRES,
    GET_GAMES_PER_GENRE,
    CLEAN_DETAIL,
    FILTER_APIBD,
    ORDER_BY_ASC_DES,
    ORDER_BY_RAITING,
    GET_DETAIL_VIDEO_GAME,
    GET_NAME_VIDEO_GAME,
} from "./actions";

const initialState = {
    videogames: [],
    genres: [],
    allGenres: [],
    backupVideoGames: [],
    detail: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                backupVideoGames: action.payload,
            };

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
                allGenres: action.payload,
            }

        case FILTER_GAMES_BY_GENRES:
            const allGenresGames = state.allGenres;
            // console.log(allGenresGames.filter(element => element.name))
            const genresFilter = action.payload === 'all' ? allGenresGames : allGenresGames.filter(element => element.name === action.payload)
            return {
                ...state,
                genres: genresFilter,
            };

        case GET_GAMES_PER_GENRE:

            let gamesGenresFilter = state.backupVideoGames;

            if (action.payload !== "Todos") {

                gamesGenresFilter = gamesGenresFilter.filter((game) =>
                    game.genres.some((gen) =>
                        gen === action.payload
                    )
                )

            }
            return {
                ...state,
                videogames: gamesGenresFilter,
            };

        case CLEAN_DETAIL:
            return {
                ...state,
                detail: state.payload
            }

        case FILTER_APIBD:
            // console.log("Action filter ByApiBD Antes: ", action.payload)
            let gamesFilterByApiBd = state.backupVideoGames;

            if (action.payload === "bdGames") {
                // console.log("Entro a bdGames")
                // console.log(gamesFilterByApiBd.filter((elemet) => elemet.createByUs))
                gamesFilterByApiBd = gamesFilterByApiBd.filter((elemet) => elemet.createByUs)
                // console.log("Console 2: ", gamesFilterByApiBd)
            } else if (action.payload === "apiGames") {
                // console.log("Entro a apiGames")
                gamesFilterByApiBd = gamesFilterByApiBd.filter((element) => !element.createByUs)
            }
            // console.log("Console: ", gamesFilterByApiBd)
            return {
                ...state,
                videogames: gamesFilterByApiBd
            }

        case ORDER_BY_ASC_DES:

            let obrderByAscDesc = action.payload === 'ascendente' ?
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
            return {

                ...state,
                videogames: obrderByAscDesc.slice(0, 5)

            }

        case ORDER_BY_RAITING:

            let filterObrderByRaiting = action.payload === 'raitingmayor' ?
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0
                })
            return {

                ...state,
                videogames: filterObrderByRaiting

            }

        case GET_DETAIL_VIDEO_GAME:
            //const filterId = state.videogames.filter(element => element.id === action.payload)
            return {
                ...state,
                detail: action.payload
            }

        case GET_NAME_VIDEO_GAME:
            return {
                ...state,
                videogames: action.payload,
                backupVideoGames: action.payload,
            }

        default:
            return { ...state };
    }
};

export default rootReducer;