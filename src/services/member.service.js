import axios from 'axios'

import  store  from "../main.jsx"
import { SET_MEMBERS, REMOVE_MEMBER ,EDIT_MEMBER ,ADD_MEMBER ,GET_MEMBER } from "../redux/member.reducer"

const url = 'http://127.0.0.1:8001/cinema/members'

export const AddNewSubscription = async(memberId,movieId,movieDate)=>{
    try {
        if(!memberId || !movieId || !movieDate) return
        
        const token = localStorage.getItem('token') 

        const subscriptionUrl = 'http://127.0.0.1:8001/cinema/subscriptions'
        
        const { data } = await axios.post(subscriptionUrl, {memberId,movieId,movieDate},{
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.status==='Subscription added'){
            await loadMembers()
            store.dispatch({type:GET_MEMBER,payload:memberId})
        }
        
    } catch (err) {
        console.log('Error during adding subscription:', err)
    }
}
export const loadMembers = async (filter={searchBy:"",pageIdx:0,limitPerPage:20}) => {
    try {
        const token = localStorage.getItem('token') 

        const params = new URLSearchParams({
            search: filter.searchBy,
            page: filter.pageIdx,
            limitPerPage: filter.limitPerPage,
        });


        const urlWithParams = `${url}?${params.toString()}`
        
        const { data } = await axios.get(urlWithParams, {
            headers: {
                Authorization: `Bearer ${token}`  }})

        if(data.members)
        store.dispatch({ type: SET_MEMBERS, payload: data.members })
        return data.isLastPage
    } catch (err) {
        console.log('Error during loading members:', err);
    }
}
export const deleteMember = async(memberId)=>{
    try{    
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.delete(`${url}/${memberId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
               
        if(data.status.status==='Deleted')
        store.dispatch({type:REMOVE_MEMBER,payload:memberId}) 
       
    }catch(err){
        console.log('Error during deleting member:', err);
        }
}

export const getMember = async(memberId)=>{
    try{   
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.get(`${url}/${memberId}`, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data)
        return data
      
   }catch(err){
       console.log('Error during getting a member:', err);
       }
}

export const AddMember = async(member)=>{
    try{ 
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.post(url,member, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.member){
            store.dispatch({type:ADD_MEMBER,payload:data.member}) 
        return "ok" 
        }             
   }catch(err){
       console.log('Error during getting a member:', err);
       }
}

export const UpdateMember = async(memberId,member)=>{
    try{ 
        const token = localStorage.getItem('token') 
        
        const { data } = await axios.put(`${url}/${memberId}`,member, {
            headers: {
                Authorization: `Bearer ${token}`  }})
        if(data.member){
            store.dispatch({type:EDIT_MEMBER,payload:data.member}) 
        return "ok" 
        }             
   }catch(err){
       console.log('Error during getting a member:', err);
       }
}