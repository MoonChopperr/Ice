import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateReview } from "../../redux/review";
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { useParams } from "react-router-dom";
import { thunkAllGameReviews } from "../../redux/review";

import './ReviewModule.css'

const ReviewModule = ({ game }) => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { gameId } = useParams()
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(null)
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const currreviews = useSelector(state => state?.review)
    const reviews = Object.values(currreviews)
    const currUser = useSelector(state => state?.session?.user)
    const [shouldReload, setShouldReload] = useState(false);


    const hasReview = Array.isArray(reviews) && reviews.some(review => review?.user_id === currUser?.id)


   useEffect(() => {
        dispatch(thunkAllGameReviews(gameId))
    }, [dispatch, gameId, shouldReload])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newRating = null
        if (isLiked) {
            newRating = 1
        } else if (isDisliked) {
            newRating = -1
        }

        try {
            await dispatch(thunkCreateReview({ game_id: game.id, review, rating: newRating }))
            setReview("")
            setRating(null)
            setIsLiked(false)
            setIsDisliked(false)
            setShouldReload(!shouldReload)
        } catch (error) {
            console.error('')
        }
    }

    return (
        <>
            <div className="RM-container">
                <div className="RM-library-container">
                    <div className="RM-library-btn"><GiHamburgerMenu className="RM-library-btn-hamburger" />IN LIBRARY</div>
                    <div className="RM-library-text">{game?.title} is already in your Steam library</div>
                </div>

                <div className="RM-main-container">
                    <div className="RM-top-container">
                        <button className="RM-btn">Install Steam</button> <button className="RM-btn">Play Now</button>
                    </div>
                    <hr className="RM-hr" />

                    { hasReview ? (
                        <>
                            <div className="RM-hasReview"> You reviewed this game</div>
                            <div>
                                <button className="RM-hasReviewbtn" onClick={() => nav('/profile')}>View your review</button>
                            </div>
                            <div className="RM-hasReview-text">
                                Your review is currently marked as publicly visible. You can edit this review, delete your review, and change your rating.
                            </div>
                        </>
                    ) : (

                        <>
                            <div className="RM-title">Write a review for {game?.title}</div>
                            <div className="RM-subtext-container">
                                <div className="RM-subtext">Please describe what you liked or disliked about this game and whether you recommend it to others.</div>
                                <div className="RM-subtext">Please remember to be polite and follow the Rules and Guidelines.</div>
                            </div>
                            <div className="RM-description">
                                <img className='RM-pfp' src="https://ice-capstone-bucket.s3.amazonaws.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" alt="Profile picture" />
                                <textarea
                                    className="RM-textarea"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Write your review here..."
                                />
                            </div>
                            <div className="RM-below-review">Do you recommend this game?</div>
                            <div className="RM-below-container">
                                <div className="RM-rating-btns">
                                    <button className="RM-rate-btn" onClick={() => { setIsLiked(true); setIsDisliked(false); }}>
                                        {isLiked ? <ImCheckmark className="RM-thumb" /> : <FaThumbsUp className="RM-thumbs" />}
                                        Yes
                                    </button>
                                    <button className="RM-rate-btn" onClick={() => { setIsDisliked(true); setIsLiked(false); }}>
                                        {isDisliked ? <ImCheckmark className="RM-thumb" /> : <FaThumbsDown className="RM-thumbs" />}
                                        No
                                    </button>
                                </div>
                                <div>
                                    <button className="RM-btn-submit" onClick={handleSubmit}>Post review</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </>
    )
}

export default ReviewModule
