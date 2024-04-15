import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkAllUserReviews } from "../../redux/review";
import { thunkAllGames } from "../../redux/game";
import { thunkUpdateReview, thunkDeleteReview } from "../../redux/review";

function ReviewProfile() {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state?.session?.user)
    const userReviews = useSelector(state => state?.review?.userReviews)
    const games = useSelector((state) => state?.game?.games)
    console.log('games', games)
    const getGameTitle = (review) => {
        const game = games?.find(game => game.id === review.game_id)
        return game ? game.title : "Game Title Not Found"
    }

    console.log('userReviews', userReviews)


    useEffect(() => {
        dispatch(thunkAllUserReviews(currUser.id))
        dispatch(thunkAllGames())
    }, [dispatch, currUser.id])


    return (
        <>
            <div className="PFP-reviews">
                {userReviews?.reviews?.map(review => (
                    <div key={review.id} className="UR-card">
                        <div className="UR-">
                            <h3>{getGameTitle(review)}</h3>
                            <div>{review.createdAt}</div>
                        </div>
                        <div className="UR-">
                            <div>{review.review}</div>
                        </div>
                        <div className="UR-">
                            <div>Helpful: {review.helpful}</div>
                            <div>Funny: {review.funny}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ReviewProfile
