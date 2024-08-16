import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovie, UpdateMovie ,AddMovie } from "../services/movie.service"

export default function EditMovie() {

    const navigate = useNavigate()
    
    const { movieId:id } = useParams()
    const [newGanre,setNewGanre] = useState("")
    const [movie,setMovie] = useState({
        name:"",
        premierred:Date.now(),
        genres:[]
    })

    
    useEffect(() => {
        const fetchMovie = async () => {
            if (id!=='add') {
                try {
                    const tempMovie = await getMovie(id)
                    console.log(tempMovie)
                    setMovie(tempMovie)
                } catch (err) {
                    console.error('Error fetching movie:', err)
                }
            }
        }

        fetchMovie()
    }, [id])


    const Update = async(id,movie)=>{
        try{
        const status = await UpdateMovie(id,movie)
        if(status==='ok') navigate('/movies')
        } catch (err) {
            console.error('Error updating movie:', err)
        }
    }

    const Add = async(movie)=>{
        try{
        const status = await AddMovie(movie)
        console.log(status)
        if(status==='ok') navigate('/movies')
        } catch (err) {
            console.error('Error adding movie:', err)
        }
    }

    function deleteGanre(selectedGanre){
        const filteredGanres = movie.genres.filter(ganre=> ganre !== selectedGanre)
        setMovie({...movie,genres: filteredGanres})
    }

    function addGanre(){
        const newGanres = [...movie.genres,newGanre]
        setMovie({...movie,genres: newGanres})
        setNewGanre("")
    }
    
if(!movie) return <div>Loading...</div>
return(
    <section className='edit-movie'>
    <h1>{id!=='add'? 'Edit ' : 'Add a new '} movie</h1>
    <label>Name:</label><br/>
    <input type="text" value={movie.name} onChange={(ev)=>setMovie({...movie,name:ev.target.value})}/>
    <br/>
    <label>Premierred:</label><br/>
    <input type="date" value={movie.premierred} onChange={(ev)=>setMovie({...movie,premierred:ev.target.value})}/>
    <br/>
    <label>Img:</label><br/>
    <input type="text" value={movie.img} onChange={(ev)=>setMovie({...movie,img:ev.target.value})}/>
    <br/>
    <label>ganres:</label><br/>
    {movie.genres.map(ganre=> (<li key={ganre}> {ganre} <button className='ganre-btn' onClick={()=>deleteGanre(ganre)}>X</button></li>))}
    <input type="text" onChange={(ev)=>setNewGanre(ev.target.value)} placeholder='new ganre' value={newGanre} />
    <button className='ganre-btn' onClick={addGanre}>add</button>
    <br/><br/>
   
   
    <button onClick={()=>navigate('/movies')}>Back</button>
    <button onClick={()=>id!=='add'? Update(id,movie) : Add(movie)}>{id!=='add'? 'Update' : 'Add'}</button>
    </section>
)
   
}