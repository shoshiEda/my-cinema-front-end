import axios from 'axios'

import  store  from "../main.jsx"
import { SET_USERS, REMOVE_USER ,EDIT_USER } from "../redux/user.reducer"

const url = 'http://127.0.0.1:8001/user'


export const loadUsers = async (filter={searchBy:"",pageIdx:0,limitPerPage:6}) => {
    try {
        const token = localStorage.getItem('token') 

        const params = new URLSearchParams({
            search: filter.searchBy,
            page: filter.pageIdx,
            limitPerPage: filter.limitPerPage
        });

        const urlWithParams = `${url}?${params.toString()}`
        
        const { data } = await axios.get(urlWithParams, {
            headers: {
                Authorization: `Bearer ${token}`  }})
               
        if(data.fixedUsers){
        store.dispatch({ type: SET_USERS, payload: data.fixedUsers })
        return data.isLastPage
        }
    } catch (err) {
        console.log('Error during loading users:', err);
    }
}
export const deleteUser = async(userId)=>{
    try{    
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.delete(`${url}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.status==='Deleted')
        store.dispatch({type:REMOVE_USER,payload:userId}) 
       
    }catch(err){
        console.log('Error during deleting user:', err);
        }
}

export const getUser = async(userId)=>{
    try{   
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.get(`${url}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data)
        return data
      
   }catch(err){
       console.log('Error during getting a user:', err);
       }
}

export const UpdateUser = async(userId,user)=>{
    try{ 
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.put(`${url}/${userId}`,user, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.updatedUser){
            store.dispatch({type:EDIT_USER,payload:data.updatedUser}) 
        return "ok" 
        }             
   }catch(err){
       console.log('Error during getting a user:', err);
       }
}
import axios from 'axios'

import  store  from "../main.jsx"
import { SET_USERS, REMOVE_USER ,EDIT_USER } from "../redux/user.reducer"

const url = 'http://127.0.0.1:8001/user'


export const loadUsers = async (filter={searchBy:"",pageIdx:0,limitPerPage:6}) => {
    try {
        const token = localStorage.getItem('token') 

        const params = new URLSearchParams({
            search: filter.searchBy,
            page: filter.pageIdx,
            limitPerPage: filter.limitPerPage
        });

        const urlWithParams = `${url}?${params.toString()}`
        
        const { data } = await axios.get(urlWithParams, {
            headers: {
                Authorization: `Bearer ${token}`  }})
               
        if(data.fixedUsers){
        store.dispatch({ type: SET_USERS, payload: data.fixedUsers })
        return data.isLastPage
        }
    } catch (err) {
        console.log('Error during loading users:', err);
    }
}
export const deleteUser = async(userId)=>{
    try{    
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.delete(`${url}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.status==='Deleted')
        store.dispatch({type:REMOVE_USER,payload:userId}) 
       
    }catch(err){
        console.log('Error during deleting user:', err);
        }
}

export const getUser = async(userId)=>{
    try{   
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.get(`${url}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data)
        return data
      
   }catch(err){
       console.log('Error during getting a user:', err);
       }
}

export const UpdateUser = async(userId,user)=>{
    try{ 
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.put(`${url}/${userId}`,user, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.updatedUser){
            store.dispatch({type:EDIT_USER,payload:data.updatedUser}) 
        return "ok" 
        }             
   }catch(err){
       console.log('Error during getting a user:', err);
       }
}