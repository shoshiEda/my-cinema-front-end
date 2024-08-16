import axios from 'axios'

import  store  from "../main.jsx"
import { SET_MOVIES, REMOVE_MOVIE ,EDIT_MOVIE ,ADD_MOVIE } from "../redux/movie.reducer"

const url = 'http://127.0.0.1:8001/cinema/movies'


export const loadMovies = async (filter={searchBy:"",pageIdx:0,limitPerPage:20,searchByGenre:""}) => {
    try {
        const token = localStorage.getItem('token') 

        const params = new URLSearchParams({
            search: filter.searchBy,
            page: filter.pageIdx,
            limitPerPage: filter.limitPerPage,
            searchByGenre:filter.searchByGenre
        });


        const urlWithParams = `${url}?${params.toString()}`
        
        const { data } = await axios.get(urlWithParams, {
            headers: {
                Authorization: `Bearer ${token}`  }})

        if(data.movies)
        store.dispatch({ type: SET_MOVIES, payload: data.movies })
        return data.isLastPage
    } catch (err) {
        console.log('Error during loading movies:', err);
    }
}
export const deleteMovie = async(movieId)=>{
    try{    
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.delete(`${url}/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
               
        if(data.status.status==='Deleted')
        store.dispatch({type:REMOVE_MOVIE,payload:movieId}) 
       
    }catch(err){
        console.log('Error during deleting movie:', err);
        }
}

export const getMovie = async(movieId)=>{
    try{   
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.get(`${url}/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data)
        return data
      
   }catch(err){
       console.log('Error during getting a movie:', err);
       }
}

export const AddMovie = async(movie)=>{
    try{ 
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.post(url,movie, {
            headers: {
                Authorization: `Bearer ${token}`  }})
                console.log(data)
        if(data.movie){
            store.dispatch({type:ADD_MOVIE,payload:data.movie}) 
        return "ok" 
        }             
   }catch(err){
       console.log('Error during getting a movie:', err);
       }
}

export const UpdateMovie = async(movieId,movie)=>{
    try{ 
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.put(`${url}/${movieId}`,movie, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.movie){
            store.dispatch({type:EDIT_MOVIE,payload:data.movie}) 
        return "ok" 
        }             
   }catch(err){
       console.log('Error during getting a movie:', err);
       }
}