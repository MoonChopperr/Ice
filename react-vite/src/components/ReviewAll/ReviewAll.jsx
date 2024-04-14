import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateReview, thunkDeleteReview, thunkIncrementFunny, thunkDecrementFunny, thunkIncrementHelpful, thunkDecrementHelpful, thunkAllGameReviews } from "../../redux/review";

import './ReviewAll.css'

const AllReviewsModule = () => {
    const dispatch = useDispatch()
    const Reviews = useSelector(state => state.gameReviews);
    console.log('Reviews', Reviews);

    useEffect(() => {
        dispatch(thunkAllGameReviews())
    }, [dispatch])


    return (
        <>
            <div>
                <div>hello world</div>
            </div>
        </>
    )
}

export default AllReviewsModule
