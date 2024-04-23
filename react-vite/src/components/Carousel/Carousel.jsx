import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.css'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

function ImageCarousel() {
    const games = useSelector((state) => state.game.games)
    // console.log("ALL_games===>", games)

    function formatPrice(price) {
        if (price % 1 === 0) { //integer?
            return `${price}.00`
        } else {
            return price?.toFixed(2) // Use toFixed to ensure two decimal places
        }
    }

    // Shuffle the games array to 12 games
    const shuffle = games?.slice().sort(() => Math.random() - 0.5).slice(0, 12)    // console.log('shuffle', shuffle)
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
                    <Link className='C' to={`/game/${game.id}`} key={game.id}>
                        <div className="C-border">
                            <img className='C-image' src={game.images} alt={game.title} />
                            <div className="C-info">
                                <span className='C-TS'> Top Seller </span>
                                <span className='C-T'>{game.title}</span>
                                <span className='C-sp'>Price ${formatPrice(game.price)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </>
    )
}

export default ImageCarousel
