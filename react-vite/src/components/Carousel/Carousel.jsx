import { useEffect } from "react"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.css'
import { thunkAllGames } from "../../redux/game"
import { useDispatch, useSelector } from "react-redux"



function ImageCarousel() {

    const dispatch = useDispatch()
    const games = useSelector((state) => state.game.games)

    console.log("ALL_games===>", games)

    useEffect(() => {
        dispatch(thunkAllGames())
    }, [dispatch])

    function formatPrice(price) {
        if (price % 1 === 0) { //integer?
            return `${price}.00`
        } else {
            return price?.toFixed(2) // Use toFixed to ensure two decimal places
        }
    }

    // Shuffle the games array to 12 games
    const shuffle = games?.sort(() => Math.random() - 0.5).slice(0, 12)
    console.log('shuffle', shuffle)
    return (
        <>
            <Carousel className='main-slide'

                autoPlay infiniteLoop interval={5000}
                showThumbs={false}
                showArrows={false}
                showStatus={false}
                transitionMode="fade"
            >
                {shuffle?.map((game) => (
                    <div className="C-border" key={game?.id}>
                        <a href={`/game/${game?.id}`}>
                            <img src={game?.images} alt={game?.title} />
                        </a>
                        <div className="C-info">
                            <span className='C-TS'> Top Seller </span>
                            <span className='C-T'>{game?.title}</span>
                            <span className='C-sp'>Price ${formatPrice(game?.price)}</span>
                        </div>
                    </div>
                ))}
            </Carousel>
        </>
    )
}

export default ImageCarousel
