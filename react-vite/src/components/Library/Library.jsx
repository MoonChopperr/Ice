import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetLibrary } from "../../redux/library";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Footer from "../Footer/Footer";
import './Library.css'

function Library() {
    const dispatch = useDispatch()
    const library = useSelector(state => state.library.currentLibrary)
    const nav = useNavigate()
    const currUser = useSelector(state => state.session.user)

    if (!currUser) {
        nav('/')
    }

    function formatDate(date) {
        if (!date) {
            return ''
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const [year, month, day] = date.split('-')

        const monthName = months[parseInt(month, 10) - 1] //converts month into integer, 10 is specify conversion base to decimal | need to subtract 1 because array index 0
        return `${monthName} ${parseInt(day, 10)}, ${year}`
    }

    function hoursPlayed(createdAt) {
        const createdAtDate = new Date(createdAt)
        const currentDate = new Date()
        // const currentDate = currentDatee.toUTCString()
        console.log('currentDate', currentDate)
        console.log('createdAt', createdAtDate)

        const utcOffsetMs = currentDate.getTimezoneOffset() * 60 * 1000;

        // Convert the createdAt date to the user's timezone
        const createdAtDateLocal = new Date(createdAtDate.getTime() - utcOffsetMs);

        // const difference = currentDate - createdAtDate
        //random doesnt take args,
        const random = Math.floor(Math.random() * 5) + 1

        //change first value to smaller for bigger hours
        // let hours = difference / (1000 * 60 * 60) / random
        // console.log('hours', hours)

        let difference = currentDate - createdAtDateLocal;
        console.log('difference', difference)

        let hours = difference / (1000 * 60 * 60) / random;
        if (hours < 1) {
            hours = difference / (1000 * 60) / random
            return Math.round(hours) + ' minutes'
        }
        return Math.round(hours) + ' hours'

    }

    useEffect(() => {
        if (currUser) {
            dispatch(thunkGetLibrary())
        }
    }, [dispatch])



    return (
        <>
            <div className="LB-container">

                <div className="LB-title">Your Library</div>
                <div className="LB-items-container">
                    {library && library?.library.slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
                        .map(game => (
                            <div key={game.id} className="LB-item">
                                <div className="LB-item-title">{game.title}</div>
                                <Link to={`/game/${game.id}`}><img className='LB-item-img' src={game.images}></img></Link>
                                <div className="LB-playtime-value"><span className="LB-playtime">Play Time: </span>{hoursPlayed(game.createdAt)}</div>
                                <div className="LB-purchased-value"><span className="LB-purchased">Purchased on: </span>{formatDate(game.createdAt)}</div>
                            </div>
                        ))}
                    {/* {library && library?.library.map(game => (
                        <div key={game.id} className="LB-item">
                            <div className="LB-item-title">{game.title}</div>
                            <img className='LB-item-img' src={game.images}></img>
                            <div>Purchased on: {formatDate(game.createdAt)}</div>
                        </div>
                    ))} */}
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Library
