/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { AddNewSubscription } from "../services/member.service"
import { getAllMovies } from "../services/movie.service"

import { GET_MEMBER } from '../redux/member.reducer'

import { useDispatch,useSelector } from 'react-redux'

export default function EditMemberSubscriptions() {

    
    const { memberId:id } = useParams()
    const chosenMember = useSelector(state=>  state.memberModule.chosenMember)
    const allMovies = useSelector(state=>  state.movieModule.allMovies)
    const [movieName,setMovieName] = useState("")
    const [movieDate,setMovieDate] = useState("")


    const dispatch = useDispatch()  
    const navigate = useNavigate()
   
        useEffect(() => {
            if (id !== 'add') {
                dispatch({ type: GET_MEMBER, payload: id })
                if(!allMovies || !allMovies.length)
                    getAllMovies()

            }
        }, [id])
        
    const Add = async()=>{
        try{
            const movie = allMovies.find(movie => movie.name===movieName)
            if(!movie) 
                alert('please choose from the list')
            else if(!movieDate) 
                alert('please choose a date')
            else
                await AddNewSubscription(id,movie._id,movieDate)
            
            } catch (err) {
                console.error('Error updating member:', err)
            }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('he-IL', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric',     
        })
    }

if(!chosenMember) return <div>Loading...</div>
return(
    <section className='edit-member'>
        <h2>Editing subscriptions for: {chosenMember.name}</h2>
        {chosenMember.movies && chosenMember.movies.length>0 && <div className='subscriptions-modal'>
                {chosenMember.movies.map((movie,idx) => <li className='subscriptions' key={idx}>{movie.name} - {formatDate(movie.date)}</li>)}
            </div>}
        {allMovies && allMovies.length>0 && <div>
        <label htmlFor="movie">choose a movie:</label>
            <input list="options" id="myInput" name="myInput" placeholder="Choose from the list" onChange={(ev)=>setMovieName(ev.target.value)} />     
            <datalist id="options">
                {allMovies.map(movie=><option key={movie._id} value={movie.name} />)}
            </datalist>
            <br/>
            <label htmlFor="movie">date:</label>
            <input type="date" value={movieDate} onChange={(ev)=>setMovieDate(ev.target.value)} /> 
            <br/>
            <button onClick={Add}>Subscribe</button></div>}
            <button onClick={()=>navigate("/members")}>Back</button>
            
       </section>
)
   
}