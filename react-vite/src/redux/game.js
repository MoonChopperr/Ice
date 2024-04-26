
//Action Creators
export const GET_GAMES = '/game/GET_GAMES'
export const GET_ONE_GAME = '/game/GET_ONE_GAME'
export const CREATE_GAME = '/game/CREATE_GAME'
export const UPDATE_GAME = '/game/UPDATE_GAME'
export const DELETE_GAME = '/game/DELETE_GAME'

export const SEARCH_GAMES_REQUEST = 'SEARCH_GAMES_REQUEST';
export const SEARCH_GAMES_SUCCESS = 'SEARCH_GAMES_SUCCESS';
export const SEARCH_GAMES_FAILURE = 'SEARCH_GAMES_FAILURE';

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

const searchGamesRequest = () => ({
    type: SEARCH_GAMES_REQUEST,
})

const searchGamesSuccess = (games) => ({
    type: SEARCH_GAMES_SUCCESS,
    payload: games,
})

const searchGamesFailure = (error) => ({
    type: SEARCH_GAMES_FAILURE,
    payload: error,
})

//thunks
export const thunkSearchGames = (query) => async (dispatch) => {
    dispatch(searchGamesRequest());

    try {
        const response = await fetch(`/api/games/search?q=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        dispatch(searchGamesSuccess(data));
    } catch (error) {
        dispatch(searchGamesFailure(error.message));
    }
}

export const thunkAllGames = () => async (dispatch) => {
    const response = await fetch(`/api/games`)
    const data = await response.json()

    if (!response.ok) return { errors: data }
    // console.log('thunk games=>', data)
    dispatch(getGames(data.games))
    return data
}

export const thunkOneGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`)
    const data = await response.json()

    if (!response.ok) return { errors: data }
    await dispatch(getOneGame(data))
    return data

}

export const thunkCreateGame = newGame => async (dispatch) => {
    const response = await fetch(`/api/games/create`, {
        method: "POST",
        // headers: { 'Content-Type': 'application/json' },
        body: newGame
    })

    if (!response.ok) {
        const data = await response.json()
        // console.log(data)
        return { errors: data }
    }

    const data = await response.json()
    newGame = await dispatch(createGame(data))
    // console.log('ThunkNewGame=>', newGame)
    return data
}


export const thunkUpdateGame = (gameId, updatedGame) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        method: "PUT",
        // headers: { 'Content-Type': 'application/json' },
        body: updatedGame
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    updatedGame = await dispatch(updateGame(data))
    // console.log('ThunkUpdatedGame', updateGame)
    return data
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
            // const gameState = {}
            // action.games.forEach((game) => {
            //     gameState[game.id] = game
            // })
            // return gameState
            return { ...state, games: action.games }
        }
        case GET_ONE_GAME: {
            return { ...state, [action.game.id]: action.game }
        }
        case CREATE_GAME: {
            return { ...state, [action.game.id]: action.game }
        }
        case UPDATE_GAME: {
            return { ...state, ...action.game }
        }
        case DELETE_GAME: {
            const deleteState = { ...state }
            delete deleteState[action.game]
            return deleteState
        }
        case SEARCH_GAMES_REQUEST: {
            return { ...state, loading: true, error: null }
        }

        case SEARCH_GAMES_SUCCESS: {
            return { ...state, games: action.payload, loading: false, error: null, }
        }

        case SEARCH_GAMES_FAILURE: {
            return { ...state, games: [], loading: false, error: action.payload, }
        }
        default:
            return state
    }
}

export default gameReducer
