//Action Creators
export const GET_GAMES = '/game/GET_GAMES'
export const GET_ONE_GAME = '/game/GET_ONE_GAME'
export const CREATE_GAME = '/game/CREATE_GAME'
export const UPDATE_GAME = '/game/UPDATE_GAME'
export const DELETE_GAME = '/game/DELETE_GAME'
const getGames = games => ({
    type: GET_GAMES,
    games
})

const getOneGame = game => ({
    type: GET_ONE_GAME,
    game
})

const createGame = game => ({
    type: CREATE_GAME,
    game
})

const updateGame = game => ({
    type: UPDATE_GAME,
    game
})

const deleteGame = game => ({
    type: DELETE_GAME,
    game
})


//thunks

const createUpdateHelper = async (dispatch, game, gameId) => {
    const { title, about, price, release_date, developer, publisher, franchise, ESRB_rating, genre, image } = game
    const formData = new FormData()
    formData.append('title', title)
    formData.append('about', about)
    formData.append('price', price)
    formData.append('release_date', release_date)
    formData.append('developer', developer)
    formData.append('publisher', publisher)
    formData.append('franchise', franchise)
    formData.append('ESRB_rating', ESRB_rating)
    formData.append('genre', genre)
    formData.append('image', image)

    let url
    let method

    if (gameId) {
        url = `/api/games/${gameId}`
        method = 'PUT'
    } else {
        url = `/api/games/`
        method = 'POST'
    }

    const response = await fetch(url, {
        method,
        body: formData
    })

    const data = await response.json()

    if (!response.ok) return { errors: data }
    dispatch(updateGame(data))
    return data
}

export const thunkAllGames = games => async (dispatch) => {
    const response = await fetch(`/api/games`)
    const data = await response.json()

    if (!response.ok) return { errors: data }
    dispatch(getGames(data.games))
    return data
}

export const thunkOneGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`)
    const data = await response.json()

    if (!response.ok) return { errors: data }
    dispatch(getOneGame(data.games))
    return data

}

export const thunkCreateGame = game => async (dispatch) => {
    return createUpdateHelper(dispatch, game)
}


export const thunkUpdateGame = (gameId, game) => async (dispatch) => {
    return createUpdateHelper(dispatch, game, gameId)
}

export const thunkDeleteGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        await response.json()
        // const gameId = await response.json()
        dispatch(deleteGame(gameId))
    }
}

//Reducer
function gameReducer(state = {}, action) {
    switch (action.type) {
        case GET_GAMES: {
            const gameState = {}
            action.games.forEach((game)=>{
                gameState[game.id] = game
            })
            return gameState
        }
        case GET_ONE_GAME: {
            return { ...state, [action.game.id]:action.game}
        }
        case CREATE_GAME:{
            return {...state, [action.game.id]:action.game}
        }
        case UPDATE_GAME:{
            return {...state, ...action.game}
        }
        case DELETE_GAME:{
            const deleteState = {...state}
            delete deleteState[action.game]
            return deleteState
        }
        default:
            return state
    }
}

export default gameReducer
