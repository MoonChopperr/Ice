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
    console.log('gameQuery', games)
    useEffect(() => {
        if (query) { // Check if query is truthy (not undefined, null, or empty string)
            dispatch(thunkSearchGames(query))
        }
    }, [dispatch, query])

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
                                        <div key={game.id} className="LB-item">
                                            <div className="LB-item-title">{game.title}</div>
                                            <Link to={`/game/${game.id}`}><img className='LB-item-img' src={game.images} alt={game.title}></img></Link>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Search;
