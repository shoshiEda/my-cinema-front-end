import { useState } from "react"
import {login,signup} from '../services/auth.service.js'

export default function LoginPage(){

const [isLogin,setIsLogin] = useState(true)
const [showPassword,setShowPassword] = useState(false)
const [isError,setIsError] = useState(false)
const [isErrorMsg,setIsErrorMsg] = useState("")
const [user,setUser] = useState({username:"",password:"",firstName:"",lastName:""})


async function loginSighup(){
    if(!user.username && !user.password) 
        {
            setIsError(true)
            setIsErrorMsg("username and password are required")
            return
        }
    if(isLogin) 
        {
            const resp = await login(user.username,user.password) 
            if(resp.error)
            {
                setIsError(true)
                setIsErrorMsg(resp.error)
            }
         }
         else{
            const resp = await signup(user)
            if(resp.error)
                {
                    setIsError(true)
                    setIsErrorMsg(resp.error)
                }
             }         
}


return(
    <section className="login-bg">
        <div className="login-page">
            <h1>Welcome to your cinema</h1>
            {isError && <p className="login-error">{isErrorMsg}</p>}
            <span className="login-error">*</span> username:<input type="text" placeholder="username" onChange={(ev)=>setUser({...user,username:ev.target.value})}/>
            <br/>
            <span className="login-error">*</span> password:<input type={showPassword ? "text" : "password"}  placeholder="password" onChange={(ev)=>setUser({...user,password:ev.target.value})}/>   
            <br/>
            {!isLogin && <>first name: <input type="text" placeholder="first name" onChange={(ev)=>setUser({...user,firstName:ev.target.value})}/><br/></>}    
            {!isLogin && <>last name: <input type="text" placeholder="last name" onChange={(ev)=>setUser({...user,lastName:ev.target.value})}/><br/></>}
            <input type="checkbox" checked={showPassword} onChange={()=>setShowPassword(!showPassword)} /> Show password
            <br/>
            <p className="login-error">* required fields</p>
            <button className="login-signup-btn" onClick={()=>setIsLogin(!isLogin)}> {isLogin? "not registered? create new account" : "already hava an account? login"} </button>
            <br/>
            <button onClick={loginSighup}>{isLogin? "Login" : "Signup"}</button>
        </div>
    </section>
)}

