//Action Creators
export const ADD_TO_WISHLIST = '/wishlist/ADD_TO_WISHLIST'
export const UPDATE_WISHLIST = '/wishlist/UPDATE_WISHLIST'
export const DELETE_WISHLIST_ITEM = '/wishlist/DELETE_WISHLIST_ITEM'
export const GET_USER_WISHLIST = '/wishlist/GET_USER_WISHLIST'

const addWishlist = item => ({
    type: ADD_TO_WISHLIST,
    item
})

const updateWishlist = item => ({
    type: UPDATE_WISHLIST,
    item
})

const deleteWishlistItem = item => ({
    type: DELETE_WISHLIST_ITEM,
    item
})

const getWishlist = items => ({
    type: GET_USER_WISHLIST,
    items
})

//thunks
export const thunkAddWishlist = item => async (dispatch) => {
    const response = await fetch(`/api/wishlist/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    await dispatch(addWishlist(data))
    return data
}

export const thunkUpdateWishlist = (wishlist_item_id, updatedItem) => async (dispatch) => {
    const response = await fetch(`/api/wishlist/${wishlist_item_id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    await dispatch(updateWishlist(data))
    return data
}

export const thunkDeleteWishlistItem = (wishlist_item_id) => async (dispatch) => {
    const response = await fetch(`/api/wishlist/${wishlist_item_id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        await response.json()
        dispatch(deleteWishlistItem)
    }
}

export const thunkGetWishlist = () => async (dispatch) => {
    const response = await fetch(`/api/wishlist/current`)
    const data = await response.json()

    if (!response.ok) return { errors: data }
    dispatch(getWishlist(data))
    return data
}

//Reducer
function wishlistReducer(state = {}, action) {
    switch (action.type) {
        case ADD_TO_WISHLIST: {
            return { ...state, [action.item.id]: action.item }
        }
        case UPDATE_WISHLIST: {
            return { ...state, [action.item.id]: action.item }
        }
        case DELETE_WISHLIST_ITEM: {
            const newState = { ...state }
            delete newState[action.item.id]
            return newState
        }
        case GET_USER_WISHLIST: {
            return {...state, currentWishlist: action.items}
        }
        default:
            return state
    }
}

export default wishlistReducer
