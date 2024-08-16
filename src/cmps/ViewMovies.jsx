import { useSelector } from "react-redux";
import { useEffect , useState } from "react";
import { useNavigate } from 'react-router-dom';


import { loadMovies, deleteMovie } from "../services/movie.service"
import MovieList from "./MovieList"

export default function ViewMovies(){

    const limitPerPage = 20

    const navigate = useNavigate()

    const movies = useSelector((state) => state.movieModule.movies)
    const [searchBy,setSearchBy] = useState("")
    const [searchByGenre,setSearchByGenre] = useState("")
    const [pageIdx,setPageIdx] = useState(0)
    const [isLastPage,setIsLastPage] = useState(false)
    const [searchTrigger, setSearchTrigger] = useState(false)

    useEffect(()=>{
        const fetchMovies = async()=>{
           
            const lastPage = await loadMovies({searchBy,pageIdx,limitPerPage,searchByGenre})
            setIsLastPage(lastPage)
        }
        fetchMovies()
    },[pageIdx,searchTrigger])

    


    if(!movies || !movies.length) return <div>There are no movies found</div>
    return(
        <section className="movie-container">
            <h1 className="movie-header">Movies:</h1>
            <div className="pagination">
                <button disabled={pageIdx === 0} onClick={()=>setPageIdx(pageIdx-1)}>← prev page</button>
                <button disabled={isLastPage} onClick={()=>setPageIdx(pageIdx+1)}>next page →</button>
            </div>
            <button onClick={()=>navigate(`/movie/add`)}>Add new movie</button>
            <div className="search">
            <label>search by name:</label>
            <input type="text" onChange={(ev)=>setSearchBy(ev.target.value)}/>
            
            <button onClick={()=>{setPageIdx(0),setSearchTrigger(!searchTrigger)}}>&gt;</button></div>
            <br/>
            <div className="search">
            <label htmlFor="genres">search by genres:</label>
            <input list="options" id="myInput" name="myInput" onChange={(ev)=>setSearchByGenre(ev.target.value)} />
           
            <datalist id="options">
                <option value="Comedy" />
                <option value="Drama" />
                <option value="Action" />
                <option value="Horror" />
            </datalist>
            <button onClick={()=>{setPageIdx(0),setSearchTrigger(!searchTrigger)}}>&gt;</button></div>

            <MovieList movies={movies} deleteMovie={deleteMovie}/>
        </section>
    )
}