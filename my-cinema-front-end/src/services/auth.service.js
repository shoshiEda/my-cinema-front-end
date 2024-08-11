import axios from 'axios'
import Cookies from 'js-cookie';
//import * as jwtDecode from 'jwt-decode'


const url = 'http://127.0.0.1:8001/auth'

export const login = async(username,password)=>{
    try{
        const response = await axios.post(url + '/login', { username, password }, {
            withCredentials: true, 
          });
      
          
          const token = Cookies.get('loginToken')
      
    console.log(response,token)
        /*const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);*/
    }catch(err){
        const errorMessage = err.response?.data?.error || err.message
        console.log('Error during login:', errorMessage);
        return { error: errorMessage }    }
}

export const signup = async(user)=>{
    try{
        const response = await axios.post(url + '/signup', { user }, {
            withCredentials: true, 
          });
      
          
          const token = Cookies.get('loginToken')
      
    console.log(response,token)
        /*const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);*/
    }catch(err){
        const errorMessage = err.response?.data?.error || err.message
        console.log('Error during login:', errorMessage);
        return { error: errorMessage } 
    }
}


