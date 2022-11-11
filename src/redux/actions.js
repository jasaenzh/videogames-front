import axios from 'axios';
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_GAMES_BY_GENRES = "FILTER_GAMES_BY_GENRES";
export const GET_GAMES_PER_GENRE = "GET_GAMES_PER_GENRE"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const FILTER_APIBD = "FILTER_APIBD"
export const ORDER_BY_ASC_DES = "ORDER_BY_ASC_DES"
export const ORDER_BY_RAITING = "ORDER_BY_RAITING"
export const GET_DETAIL_VIDEO_GAME = "GET_DETAIL_VIDEO_GAME"
export const GET_NAME_VIDEO_GAME = "GET_NAME_VIDEO_GAME"



// GET VIDEO GAMES -------

export const getVideoGames = () => {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames");
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }

    }
}


export const getVideoDetail = (id) => {
    // console.log(id)

    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames/${id}`);
            // console.log("Data Detail:", json.data)
            return dispatch({
                type: GET_DETAIL_VIDEO_GAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }

    }

}

// // con promesas
// export const getVideoDetailP = (id) => {
//     return function (dispatch) {
//         try {
//             return axios.get(`http://localhost:3001/videogames/${id}`)
//                 .then(res => {
//                     dispatch({
//                         type: GET_DETAIL_VIDEO_GAME,
//                         payload: res.data
//                     })
//                 })
//         } catch (error) {
//             console.log(error)
//         }

//     }
// }



export const getNameVideoGame = (name) => {

    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            if (!json) throw Error
            return dispatch({
                type: GET_NAME_VIDEO_GAME,
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type: GET_NAME_VIDEO_GAME,
                payload: "404"
            })
        }

    }

}


// POST -------
export const addVideoGame = (payload) => {
    return async function () {
        try {
            const json = await axios.post("http://localhost:3001/videogames", payload);
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

export const cleanState = () => {
    return async function (dispatch) {
        return dispatch({
            type: CLEAN_DETAIL,
            payload: {}
        })

    }
}


// GET GENEROS

export const getGenres = () => {

    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/genres");
            return dispatch({
                type: GET_GENRES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }

    }

}



// FILTROS
export const filterGamesByGenres = (payload) => {

    return {
        type: FILTER_GAMES_BY_GENRES,
        payload
    }

}


export const GamesPerGenres = (payload) => {

    return {
        type: GET_GAMES_PER_GENRE,
        payload
    }

}


export const filterApiBd = (payload) => {

    return {
        type: FILTER_APIBD,
        payload
    }

}

export const orderAscDes = (payload) => {

    return {
        type: ORDER_BY_ASC_DES,
        payload
    }

}

export const orderByRaiting = (payload) => {

    return {
        type: ORDER_BY_RAITING,
        payload
    }

}







