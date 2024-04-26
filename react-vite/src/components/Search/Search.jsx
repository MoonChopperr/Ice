import NavBar2 from "../NavBar2/NavBar2";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkSearchGames } from "../../redux/game";
import { Link } from 'react-router-dom';

import './Search.css'

function Search() {
    const { query } = useParams()
    const dispatch = useDispatch()
    const games = useSelector((state) => state?.game?.games) || [] // Initialize as empty array if undefined
    // console.log('gameQuery', games)
    useEffect(() => {
        if (query) { // Check if query is truthy (not undefined, null, or empty string)
            dispatch(thunkSearchGames(query))
        }
    }, [dispatch, query])
    function formatDate(date) {
        if (!date) {
            return ''
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const [year, month, day] = date.split('-')

        const monthName = months[parseInt(month, 10) - 1] //converts month into integer, 10 is specify conversion base to decimal | need to subtract 1 because array index 0
        return `${monthName} ${parseInt(day, 10)}, ${year}`
    }
    const filteredGames = query ? games.filter(game => game?.title.toLowerCase().includes(query.toLowerCase())) : []

    return (
        <>
            <div className="S-Nav-container">
                <div className='cart-navbar2'>
                    <div > <NavBar2 /> </div>
                </div>
                <div className="S-container">
                    <h1 className="S-title">Search Results</h1>
                    {query ? ( // Render results only if query is truthy
                        filteredGames.length === 0 ? (
                            <p className="S-query-subtext">No games found containing &quot;{query}&quot;</p>
                        ) : (
                            <>
                                <p className="S-query-subtext">Games found containing &quot;{query}&quot;</p>
                                {filteredGames.map(game => (
                                    <div key={game.id}>
                                        <div className="S-img-container">
                                            <Link to={`/game/${game.id}`}><img className="S-img" src={game.images} alt={game.title}></img></Link>
                                        </div>
                                        <div className="S-text-container">
                                            <div className="S-game-title" >{game.title}</div>
                                            <div className="S-game-price">${game.price}</div>
                                            <div className="S-game-date">{formatDate(game.release_date)}</div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    ) : null}
                </div>
            </div >
        </>
    );
}

export default Search;
