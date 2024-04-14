import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkIncrementFunny, thunkDecrementFunny, thunkIncrementHelpful, thunkDecrementHelpful, thunkAllGameReviews, thunkAllUserReviews } from "../../redux/review";

import './ReviewAll.css'

const AllReviewsModule = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state?.review?.gameReviews)
    console.log('reviews', reviews)

    useEffect(() => {
        dispatch(thunkAllGameReviews())
    }, [dispatch])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        return `Posted: ${month} ${day}`
    }

    const handleIncrementFunny = (reviewId) => {
        dispatch(thunkIncrementFunny(reviewId))
    }

    const handleDecrementFunny = (reviewId) => {
        dispatch(thunkDecrementFunny(reviewId))
    }

    const handleIncrementHelpful = (reviewId) => {
        dispatch(thunkIncrementHelpful(reviewId))
    }

    const handleDecrementHelpful = (reviewId) => {
        dispatch(thunkDecrementHelpful(reviewId))
    }

    return (
        <div className="reviews-container">
            {/* {reviews && reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="review-header">
                        <p>{formatDate(review.createdat)}</p>
                    </div>
                    <p>{review.review}</p>
                    <div className="review-actions">
                        <button onClick={() => handleIncrementFunny(review.funny)}>Funny (+)</button>
                        <span>Funny: {review.funny}</span>
                        <button onClick={() => handleIncrementHelpful(review.helpful)}>Helpful (+)</button>
                        <span>Helpful: {review.helpful}</span>
                    </div>
                </div>
            ))} */}
        </div>
    );
};


export default AllReviewsModule
