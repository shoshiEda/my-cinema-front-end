/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MoviePreview({movie={},deleteMovie}){

    const navigate = useNavigate()
    const [isOpenModal,setIsOpenModal] = useState(false)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('he-IL', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric',     
        });
    };

    function getDates(arrOfDates)
    {
        return arrOfDates.reduce((acc, date, index) => {
            const formattedDate = formatDate(date)
            return index === 0 ? formattedDate : acc + ' - ' + formattedDate
        }, '')    }

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
                {movie.members.map(member => <li className='subscriptions' key={member._id}>{member.name} - {getDates(member.dates[0])}</li>)}
            </div>}</section>
            <p className="btns">
            <button onClick={()=>navigate(`/movie/${movie._id}`)}>update</button>
            <button onClick={()=>deleteMovie(movie._id)}>delete</button>
            </p>
           
        </div>
    )

}