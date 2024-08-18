/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from "react-redux"


export default function MoviePreview({movie={},deleteMovie}){

    const navigate = useNavigate()
    const [isOpenModal,setIsOpenModal] = useState(false)
    const loggedInUser = useSelector((state) => state.systemModule.loggedInUser)
    const [hoveredMovieIndex, setHoveredMovieIndex] = useState(null)



    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('he-IL', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric',     
        })
    }

   
    return(
        <div className="movie-preview">
            <p>name: <span className="bold">{movie.name}</span></p>
            <p>premiered: <span className="bold">{formatDate(movie.premiered)} </span></p>
            <img src={movie.img} alt={`picture of ${movie.name}`}/>
            <p>genres: </p>
            {movie.genres && movie.genres.length>0 && <ul>{movie.genres.map(ganre=><li className="ganre-list" key={ganre}>{ganre}</li>)}</ul>}
            <section className='subscription-section'>
            {movie.members.length>0 && <button className='subscriptions-btn' onClick={()=>setIsOpenModal(!isOpenModal)}>View subscriptions</button>}
            {movie.members.length>0 && isOpenModal && <div className='subscriptions-modal'>
                {movie.members.map((member,idx) => (
                    <div key={idx}>
                        {hoveredMovieIndex === idx && <section className='member-info'>
                        <p>name: <span className="bold">{member._doc.name}</span></p>
                        <p>email: <span className="bold">{member._doc.email} </span></p>
                        <p>city: <span className="bold">{member._doc.city} </span></p>
                    </section>}
                        <li className='subscriptions' 
                        onMouseEnter={() => setHoveredMovieIndex(idx)} 
                        onMouseLeave={() => setHoveredMovieIndex(null)}>
                            {member._doc.name} - {formatDate(member.dates[0])}
                        </li>
                    </div>))}
            </div>}</section>
            <p className="btns">
            {loggedInUser.permissions.includes("Update Movie") && <button onClick={()=>navigate(`/movie/${movie._id}`)}>update</button>}
            {loggedInUser.permissions.includes("Delete Movies") && <button onClick={()=>deleteMovie(movie._id)}>delete</button>}
            </p>
           
        </div>
    )

}