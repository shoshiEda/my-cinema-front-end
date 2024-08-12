import axios from 'axios'

import  store  from "../main.jsx"
import { SET_USERS, REMOVE_USER ,EDIT_USER } from "../redux/user.reducer"

const url = 'http://127.0.0.1:8001/user'


export const loadUsers = async()=>{
    try{    
        const { data : users} = await axios.get(url,{withCredentials: true}) 
        store.dispatch({type:SET_USERS,payload:users}) 
       
    }catch(err){
        console.log('Error during loading users:', err);
        }
}

export const deleteUser = async(userId)=>{
    try{    
         await axios.delete(`${url}/${userId}`,{withCredentials: true}) 
        store.dispatch({type:REMOVE_USER,payload:userId}) 
       
    }catch(err){
        console.log('Error during deleting user:', err);
        }
}

export const getUser = async(userId)=>{
    try{    
        const {data} = await axios.get(`${url}/${userId}`,{withCredentials: true})   
        return data
      
   }catch(err){
       console.log('Error during getting a user:', err);
       }
}

export const UpdateUser = async(userId,user)=>{
    try{    
        const {data} = await axios.put(`${url}/${userId}`,user,{withCredentials: true})  
        console.log(data.updatedUser)
        store.dispatch({type:EDIT_USER,payload:data.updatedUser}) 
        return "ok"

      
   }catch(err){
       console.log('Error during getting a user:', err);
       }
}