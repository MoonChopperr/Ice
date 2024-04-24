import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkIncrementFunny, thunkDecrementFunny, thunkIncrementHelpful, thunkDecrementHelpful, thunkAllGameReviews } from "../../redux/review";
import { useParams } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";

import './ReviewAll.css'

const AllReviewsModule = () => {
    const { gameId } = useParams()
    const dispatch = useDispatch()
    const currreviews = useSelector(state => state?.review)
    const reviews = Object.values(currreviews)
    const currUser = useSelector(state => state?.session?.user)

    // console.log('reviews@@@@', reviews)

    useEffect(() => {
        dispatch(thunkAllGameReviews(gameId))
    }, [dispatch, gameId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.toLocaleString('default', { month: 'long' })
        const day = date.getDate()
        return `Posted: ${month} ${day}`
    }

    const [toggledFunny, setToggledFunny] = useState({});

    const handleToggleFunny = async (reviewId) => {
        if (toggledFunny[reviewId]) {
            await dispatch(thunkDecrementFunny(reviewId))
        } else {
            await dispatch(thunkIncrementFunny(reviewId))
        }
        setToggledFunny(prevState => ({
            ...prevState,
            [reviewId]: !prevState[reviewId]
        }));
        dispatch(thunkAllGameReviews(gameId))
    }

    const handleIncrementHelpful = async (reviewId) => {
        await dispatch(thunkIncrementHelpful(reviewId))
        dispatch(thunkAllGameReviews(gameId))

    }

    const handleDecrementHelpful = async (reviewId) => {
        await dispatch(thunkDecrementHelpful(reviewId))
        dispatch(thunkAllGameReviews(gameId))

    }

    return (
        <>
            <div className="reviews-title">REVIEWS</div>
            {reviews && reviews?.length > 0 ? (
                <div className="reviews-container">
                    {reviews?.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-top-container">
                                <div className="review-top">
                                    {review?.rating === 1 ? (
                                        <div className="review-reco-text">
                                            <FaThumbsUp className="review-thumbsup" /> Recommended by&nbsp;<span className="review-username">{review.username}</span>
                                        </div>
                                    ) : (
                                        <div className="review-reco-text">
                                            <FaThumbsDown className="review-thumbsdown" /> Not Recommended by&nbsp;<span className="review-username">{review.username}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="review-posted">{formatDate(review.createdAt)}</div>
                            <div className="review-description">{review.review}</div>
                            <hr className="review-helpful-hr" />
                            <div className="review-helpful-text">Was this review helpful?</div>
                            <div className="review-actions">
                                {currUser?.id !== review.user_id && (
                                    <>
                                        <button className="review-helpful-subtext" onClick={() => handleIncrementHelpful(review.id)}><FaThumbsUp className="review-helpful-thumbs" />Yes</button>
                                        <button className="review-helpful-subtext" onClick={() => handleDecrementHelpful(review.id)}><FaThumbsDown className="review-helpful-thumbs" />No</button>
                                        <button className="review-helpful-subtext" onClick={() => handleToggleFunny(review.id)}><CiFaceSmile className="review-smily-thumbs" />Funny</button>
                                    </>
                                )}
                                {/* <button className="review-helpful-subtext" onClick={() => handleIncrementHelpful(review.id)}><FaThumbsUp className="review-helpful-thumbs" />Yes</button>
                            <button className="review-helpful-subtext" onClick={() => handleDecrementHelpful(review.id)}><FaThumbsDown className="review-helpful-thumbs" />No</button>
                            <button className="review-helpful-subtext" onClick={() => handleToggleFunny(review.id)}><CiFaceSmile className="review-smily-thumbs"/>Funny</button> */}
                            </div>
                            <div className="review-stats">
                                {review.helpful === 0 ? null : `${review.helpful} people found this review helpful`}
                            </div>
                            <div className="review-stats">
                                {review.funny === 0 ? null : `${review.funny} people found this review funny`}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="review-noreviews">No reviews yet</div>
            )}
        </>
    );
};


export default AllReviewsModule
