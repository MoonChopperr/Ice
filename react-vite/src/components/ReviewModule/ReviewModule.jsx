import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateReview } from "../../redux/review";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";

import './ReviewModule.css'

const ReviewModule = ({ game, gameId }) => {
    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(null)
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const currUser = useSelector(state => state.session)

    const handleSubmit = (e) => {
        e.preventDefault()
        let newRating = null;
        if (isLiked) {
            newRating = 1;
        } else if (isDisliked) {
            newRating = -1;
        }
        console.log('here',)
        dispatch(thunkCreateReview({ game_id: gameId, review, rating: newRating }))
        setReview("")
        setRating(null)
        setIsLiked(false)
        setIsDisliked(false)
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

                </div>

            </div>
        </>
    )
}

export default ReviewModule
