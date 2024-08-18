import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { logout } from '../services/auth.service'

import Header from "./Header"
export default function MainArea(){

    const loggedInUser = useSelector(state => state.systemModule.loggedInUser)

    useEffect(() => {
        if (loggedInUser && loggedInUser.sessionTimeOut) {
            const timeInMilliseconds = loggedInUser.sessionTimeOut * 60 * 1000;
            const timeoutId = setTimeout(() => {
                alert('Your time is up')
               logout()
            }, timeInMilliseconds)

            
            return () => clearTimeout(timeoutId);
        }
    }, [loggedInUser]);

    
    return(
        <section>
            <Header/>
            < Outlet/>
        </section>
    )}
    
