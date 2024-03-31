import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAllGames } from "../../redux/game"
import { NavLink } from "react-router-dom"
import NavBar2 from "../NavBar2/NavBar2"
import ImageCarousel from "../Carousel/Carousel"
import './LandingPage.css'
function LandingPage() {
    const dispatch = useDispatch()
    const games = useSelector((state) => state?.game?.games)

    console.log("ALL_games===>", games)

    useEffect(() => {
        dispatch(thunkAllGames())
    }, [dispatch])


    return (
        <>
            <div className="L-background">
                <div className="Landing-container">
                    <div className="N-Bar2">
                        <NavBar2 />
                    </div>
                    <div className="f-r">
                        FEATURED & RECOMMENDED
                    </div>
                    <div className="L-Carousel">
                        <ImageCarousel />
                    </div>

                    <div className="L-box">
                        
                    </div>


                    <div className="game-list">
                        {games?.map((game) => (
                            <div className="game-card" key={game?.id}>
                                <h2 className="L-title">{game?.title}</h2>
                                <NavLink to={`/game/${game?.id}`}>
                                    <img src={game?.images} alt={game?.title} />
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;
