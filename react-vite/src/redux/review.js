// Action Creators
export const GET_GAME_REVIEWS = '/reviews/GET_GAME_REVIEWS'
export const GET_USER_REVIEWS = '/reviews/GET_USER_REVIEWS'
export const CREATE_REVIEW = '/reviews/CREATE_REVIEWS'
export const UPDATE_REVIEW = '/reviews/UPDATE_REVIEWS'
export const DELETE_REVIEW = '/reviews/DELETE_REVIEWS'
export const INCREMENT_HELPFUL = '/reviews/INCREMENT_HELPFUL'
export const DECREMENT_HELPFUL = '/reviews/DECREMENT_HELPFUL'
export const INCREMENT_FUNNY = '/reviews/INCREMENT_FUNNY'
export const DECREMENT_FUNNY = '/reviews/DECREMENT_FUNNY'

const getGameReviews = reviews => ({
    type: GET_GAME_REVIEWS,
    reviews
})

const getUserReviews = reviews => ({
    type: GET_USER_REVIEWS,
    reviews
})

const createReview = review => ({
    type: CREATE_REVIEW,
    review
})

const updateReview = review => ({
    type: UPDATE_REVIEW,
    review
})

const deleteReview = review => ({
    type: DELETE_REVIEW,
    review
})

const incrementFunny = reviewId => ({
    type: INCREMENT_FUNNY,
    reviewId
})

const decrementFunny = reviewId => ({
    type: DECREMENT_FUNNY,
    reviewId
})

const incrementHelpful = reviewId => ({
    type: INCREMENT_HELPFUL,
    reviewId
})

const decrementHelpful = reviewId => ({
    type: DECREMENT_HELPFUL,
    reviewId
})

//thunks

export const thunkAllGameReviews = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/review/game/${gameId}`)
    const data = await response.json()
    dispatch(getGameReviews(data.reviews))
}

export const thunkAllUserReviews = (userId) => async (dispatch) => {
    const response = await fetch(`/api/review/user/${userId}`)
    const data = await response.json()
    dispatch(getUserReviews(data.reviews))
}

export const thunkCreateReview = newReview => async (dispatch) => {
    const response = await fetch(`/api/review/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    newReview = await dispatch(createReview(data))
    return data
}

export const thunkUpdateReview = (reviewId, updatedReview) => async (dispatch) => {
    const response = await fetch(`/api/review/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview)
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    const data = await response.json()
    updatedReview = await dispatch(updateReview(data))
    return data
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        const data = await response.json()
        return { errors: data }
    }

    await dispatch(deleteReview(reviewId))
}

export const thunkIncrementFunny = (reviewId) => async (dispatch) =>{
    const response = await fetch(`/api/review/${reviewId}/funny`, {
        method: 'POST'
    })

    if(!response.ok){
        const data = await response.json()
        return { errors: data}
    }

    const data = await response.json()
    await dispatch(incrementFunny(reviewId))
    return data
}

export const thunkDecrementFunny = (reviewId) => async (dispatch) =>{
    const response = await fetch(`/api/review/${reviewId}/funny`, {
        method: 'DELETE'
    })

    if(!response.ok){
        const data = await response.json()
        return { errors: data}
    }

    const data = await response.json()
    await dispatch(decrementFunny(reviewId))
    return data
}

export const thunkIncrementHelpful = (reviewId) => async (dispatch) =>{
    const response = await fetch(`/api/review/${reviewId}/helpful`, {
        method: 'POST'
    })

    if(!response.ok){
        const data = await response.json()
        return { errors: data}
    }

    const data = await response.json()
    await dispatch(incrementHelpful(reviewId))
    return data
}

export const thunkDecrementHelpful = (reviewId) => async (dispatch) =>{
    const response = await fetch(`/api/review/${reviewId}/helpful`, {
        method: 'DELETE'
    })

    if(!response.ok){
        const data = await response.json()
        return { errors: data}
    }

    const data = await response.json()
    await dispatch(decrementHelpful(reviewId))
    return data
}

//Reducer
function reviewReducer(state = {}, action) {
    switch (action.type) {
        case GET_GAME_REVIEWS:{
            return { ...state, gameReviews: action.reviews }
        }
        case GET_USER_REVIEWS:{
            return { ...state, userReviews: action.reviews }
        }
        case CREATE_REVIEW:{
            return { ...state, createdReview: action.review }
        }
        case UPDATE_REVIEW:{
            return { ...state, updatedReview: action.review }
        }
        case DELETE_REVIEW:{
            return { ...state, deletedReviewId: action.reviewId }
        }
        case INCREMENT_HELPFUL:{
            return { ...state, helpful: { ...state.helpful, [action.reviewId]: (state.helpful[action.reviewId] || 0) + 1 } }
        }
        case DECREMENT_HELPFUL:{
            return { ...state, helpful: { ...state.helpful, [action.reviewId]: Math.max((state.helpful[action.reviewId] || 0) - 1, 0) } }
        }
        case INCREMENT_FUNNY:{
            return { ...state, funny: { ...state.funny, [action.reviewId]: (state.funny[action.reviewId] || 0) + 1 } }
        }
        case DECREMENT_FUNNY:{
            return { ...state, funny: { ...state.funny, [action.reviewId]: Math.max((state.funny[action.reviewId] || 0) - 1, 0) } }
        }
        default:
            return state
    }
}

export default reviewReducer
