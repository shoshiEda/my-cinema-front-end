import { useSelector } from "react-redux";
import { useEffect } from "react";

import { loadUsers, deleteUser } from "../services/user.service.js"
import UserList from "./UserList"

export default function ViewUsers(){

    const users = useSelector((state) => state.userModule.users)

    useEffect(()=>{
        loadUsers()
    },[])

   

    if(!users || !users.length) return <div>Loading...</div>
    return(
        <section>
            <h1>Users:</h1>
            <UserList users={users} deleteUser={deleteUser}/>
        </section>
    )
}