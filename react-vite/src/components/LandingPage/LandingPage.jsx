import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAllGames } from "../../redux/game"
import { NavLink } from "react-router-dom"
import NavBar2 from "../NavBar2/NavBar2"
import ImageCarousel from "../Carousel/Carousel"
import Footer from "../Footer/Footer"
import './LandingPage.css'
import Loading from "../Loading/Loading"
function LandingPage() {
    const dispatch = useDispatch()
    const games = useSelector((state) => state?.game?.games)

    // console.log("ALL_games===>", games)

    useEffect(() => {
        dispatch(thunkAllGames())
    }, [dispatch])



    return (
        <>
            {games ? (
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
                            <span className="L-box"> </span>
                        </div>


                    </div>


                    <div className="game-list">
                        {games?.map((game) => (
                            <div className="game-card" key={game?.id}>
                                <h2 className="L-title">{game?.title}</h2>
                                <NavLink to={`/game/${game?.id}`}>
                                    <img className="game-img-card" src={game?.images} alt={game?.title} />
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>

            ) : <Loading />}
            <div>
                <Footer />
            </div>
        </>
    )
}

export default LandingPage;
