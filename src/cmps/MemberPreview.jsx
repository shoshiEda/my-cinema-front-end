/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";


export default function MemberPreview({member={},deleteMember}){

    const loggedInUser = useSelector((state) => state.systemModule.loggedInUser);

    const navigate = useNavigate()
    const [isOpenModal,setIsOpenModal] = useState(false)
    const [hoveredMovieIndex, setHoveredMovieIndex] = useState(null)



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('he-IL', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric',     
        })
    }

    
    
    return(
        <div className="member-preview">
            <p>name: <span className="bold">{member.name}</span></p>
            <p>email: <span className="bold">{member.email} </span></p>
            <p>city: <span className="bold">{member.city} </span></p>
            <section className='subscription-section'>
            {member.movies && member.movies.length>0 && <button className='subscriptions-btn' onClick={()=>setIsOpenModal(!isOpenModal)}>View subscriptions</button>}
            {member.movies && member.movies.length>0 && isOpenModal && <div className='subscriptions-modal'>
                {member.movies.map((movie,idx) => (
                    <div key={idx}>
                    {hoveredMovieIndex === idx && <section className='movie-info'>
                        <p>name: <span className="bold">{movie.name}</span></p>
                        <p>premiered: <span className="bold">{formatDate(movie.premiered)} </span></p>
                        <img src={movie.img} alt={`picture of ${movie.name}`}/>
                        <p>genres: </p>
                        {movie.genres && movie.genres.length>0 && <ul>{movie.genres.map(ganre=><li className="ganre-list" key={ganre}>{ganre}</li>)}</ul>}
                    </section>}
                    <li className='subscriptions' 
                    onMouseEnter={() => setHoveredMovieIndex(idx)} 
                                    onMouseLeave={() => setHoveredMovieIndex(null)}>
                                        {movie.name} - {formatDate(movie.date)}
                                        </li>
                    </div>
                ))}
            </div>}</section>

            
            {loggedInUser.permissions.includes("Update Subscription") && <button className='new-subscription' onClick={()=>navigate(`/member/subscriptions/${member._id}`)}>Add a new subscription</button>}
            <p className="btns">
            {loggedInUser.permissions.includes("Update Subscription") && <button onClick={()=>navigate(`/member/${member._id}`)}>update</button>}
            {loggedInUser.permissions.includes("Delete Subscriptions") &&<button onClick={()=>deleteMember(member._id)}>delete</button>}
            </p>
           
        </div>
    )

}