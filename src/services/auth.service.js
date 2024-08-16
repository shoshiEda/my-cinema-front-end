import axios from 'axios'
import * as jwt from 'jwt-decode'
import  store  from "../main.jsx"

import { SET_LOGGED_IN_USER } from "../redux/system.reducer.js"
import { ADD_NEW_USER } from "../redux/user.reducer.js"


const url = 'http://127.0.0.1:8001/auth'

export const login = async(username,password)=>{
    try{

        
        const response = await axios.post(url + '/login', { username, password })
        if(response.data.success){
            const token = response.data.token
            const decodedToken = jwt.jwtDecode(token)
            localStorage.setItem('loggedInUser', JSON.stringify(decodedToken));
            localStorage.setItem('token',token)
            store.dispatch({type:SET_LOGGED_IN_USER,payload:decodedToken})
            return {loggedInUser:decodedToken}
        }else{
            return {error:response.data.error}
        }
    }catch(err){
        console.log('Error during login:', err);
        }
}

export const signup = async(user)=>{
    try{
        const response = await axios.post(url + '/signup', { user })
          
          if(response.data.success){
          const token = response.data.token
          const decodedToken = jwt.jwtDecode(token)
          localStorage.setItem('loggedInUser', JSON.stringify(decodedToken));
          localStorage.setItem('token',token)
          store.dispatch({type:SET_LOGGED_IN_USER,payload:decodedToken}) 
          store.dispatch({type:ADD_NEW_USER,payload:decodedToken})  
          return {loggedInUser:decodedToken}
          }else{
            return {error:response.data.error}
          }
      }catch(err){
          console.log('Error during signup:', err);     
        }
}

export const logout = ()=>{ 
    
    localStorage.removeItem('loggedInUser')
    store.dispatch({type:SET_LOGGED_IN_USER,payload:null})

}


