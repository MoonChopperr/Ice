import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateReview } from "../../redux/review";
import { GiHamburgerMenu } from "react-icons/gi";


import './ReviewModule.css'

const ReviewModule = ({ game }) => {
    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(null)


    console.log('??', {game})
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(thunkCreateReview({ review, rating }))
        setReview("")
        setRating(null)
    }

    return (
        <>
            <div className="RM-container">
                <div className="RM-library-container">
                    <div className="RM-library-btn"><GiHamburgerMenu className="RM-library-btn-hamburger"/>IN LIBRARY</div>
                    <div className="RM-library-text">{game?.title} is already in your Steam library</div>
                </div>
                <div className="RM-top-container">
                    <button className="RM-btn">Install Steam</button> <button className="RM-btn">Play Now</button>
                </div>
                <br />
                <div className="RM-title">Write a review for {game?.title}</div>
                <div className="RM-subtext-container">
                    <span className="RM-subtext">Please describe what you liked or disliked about this game and whether you recommend it to others.</span>
                    <span className="RM-subtext">Please remember to be polite and follow the Rules and Guidelines.</span>
                </div>
                <div className="RM-description">
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
                        <button className="RM-rate-btn">Yes</button>
                        <button className="RM-rate-btn">No</button>
                    </div>
                    <div>
                        <button className="RM-btn">Post review</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewModule
