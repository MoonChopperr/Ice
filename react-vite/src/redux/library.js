//Action Creators
export const ADD_TO_LIBRARY = '/library/ADD_TO_LIBRARY'
export const GET_USER_LIBRARY = '/library/GET_USER_LIBRARY'

const addToLibrary = item =>({
    type: ADD_TO_LIBRARY,
    item
})

const getUserLibrary = items =>({
    type: GET_USER_LIBRARY,
    items
})

//thunks
export const thunkAddLibrary = item => async (dispatch) => {
    const response = await fetch(`/api/library/checkout`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })

    if (!response.ok){
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    await dispatch(addToLibrary(data))
    return data
}

export const thunkGetLibrary = () => async (dispatch) =>{
    const response = await fetch(`/api/library/`)
    const data = await response.json()

    if(!response.ok) return {errors: data}
    dispatch(getUserLibrary(data))
    return data
}

//Reducer
function libraryReducer(state={}, action){
    switch(action.type){
        case ADD_TO_LIBRARY:{
            return {...state, [action.item.id]: action.item}
        }
        case GET_USER_LIBRARY:{
            return {...state, currentLibrary: action.items}
        }
        default:
            return state
    }
}

export default libraryReducer
