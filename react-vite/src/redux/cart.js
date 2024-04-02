//Action Creators
export const ADD_TO_CART = '/cart/ADD_TO_CART'
export const UPDATE_CART = '/cart/UPDATE_CART'
export const DELETE_CART_ITEM = '/cart/DELETE_CART_ITEM'
export const CLEAR_CART = '/cart/CLEAR_CART'
export const GET_USER_CART = '/cart/GET_USER_CART'

const addCart = order => ({
    type: ADD_TO_CART,
    order
})

const updateCart = order => ({
    type: UPDATE_CART,
    order
})

const deleteOrder = order => ({
    type: DELETE_CART_ITEM,
    order
})

const clearCart = cart => ({
    type: CLEAR_CART,
    cart
})

const getCart = cart => ({
    type: GET_USER_CART,
    cart
})

//thunks

export const thunkAddCart = item => async (dispatch) =>{
    const response = await fetch(`/api/cart/create`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    newOrder = await dispatch(addCart(data))
    console.log('newOrder=>', newOrder)
    return data
}

export const thunkUpdateCart = (cartId, updatedItem) => async (dispatch) =>{
    const response = await fetch(`/api/cart/${cartId}`,{
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    updatedItem = await dispatch(updateCart(data))
    console.log("THUNK UPDATE ITEM", updatedItem)
    return data
}

export const thunkDeleteItem = (cartId) => async (dispatch) =>{
    const response = await fetch(`/api/cart/delete/${cartId}`, {
        method: "DELETE"
    })

    if (response.ok){
        await response.json()
        dispatch(deleteOrder(cartId))
    }
}

export const thunkClearCart = (cartId) => async (dispatch)=>{
    const response = await fetch(`/api/cart/clear`,{
        method:"DELETE"
    })

    if(response.ok){
        await response.json()
        dispatch(clearCart(cartId))
    }
}

export const thunkGetCart = () => async (dispatch)=>{
    const response = await fetch(`/api/cart/current`)
    const data = await response.json()

    if (!response.ok) return { errors: data }
    console.log('thunk currCart', data)
    dispatch(getCart(data))
    return data
}


//Reducer
function cartReducer(state={}, action){
    switch(action.type){
        case ADD_TO_CART: {
            return {...state, [action.order.id]: action.order}
        }
        case UPDATE_CART:{
            return {...state, [action.order.id]: action.order}
        }
        case DELETE_CART_ITEM:{
            const deleteState = {...state}
            delete deleteState[action.order]
            return  deleteState
        }
        case CLEAR_CART:{
            const deleteState = {...state}
            delete deleteState[action.cart]
            return deleteState
        }
        case GET_USER_CART:{
            return {...state, cart: action.cart}
        }
        default:
            return state
    }
}

export default cartReducer
