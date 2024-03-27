import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { thunkCreateGame, thunkUpdateGame } from '../../redux/game'
import './GameDetailsForm.css'

const CreateGame = ()=>{
    const dispatch = useDispatch()
    const navi = useNavigate()
    const user = useSelector((state)=> state.session.user)
    const games = useSelector((state)=> state.game)
    const {gameId} = useParams()

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [price, setPrice] = useState(0)
    const [releaseDate, setReleaseDate] = useState('')
    const [developer, setDeveloper] = useState('')
    const [publisher, setPublisher] = useState('')
    const [franchise, setFranchise] = useState('')
    const [ESRBRating, setESRBRating] = useState('')
    const [genres, setGenres] = useState([])
    const [image, setImage] = useState(null)

    useEffect(()=>{
        
    })
}
