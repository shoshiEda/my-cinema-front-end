import { useSelector } from "react-redux";
import { useEffect , useState } from "react";

import { loadUsers, deleteUser } from "../services/user.service.js"
import UserList from "./UserList"

export default function ViewUsers(){

    const limitPerPage = 6

    const users = useSelector((state) => state.userModule.users)
    const [searchBy,setSearchBy] = useState("")
    const [pageIdx,setPageIdx] = useState(0)
    const [isLastPage,setIsLastPage] = useState(false)
    const [searchTrigger, setSearchTrigger] = useState(false)


    useEffect(()=>{
        const fetchUsers = async()=>{
            const lastPage = await loadUsers({searchBy,pageIdx,limitPerPage})
            setIsLastPage(lastPage)
        }
        fetchUsers()
    },[pageIdx,searchTrigger])

    


    if(!users || !users.length) return <div>There are no users found</div>
    return(
        <section>
            <h1 className="user-header">Users:</h1>
            <div className="pagination">
                <button disabled={pageIdx === 0} onClick={()=>setPageIdx(pageIdx-1)}>← prev page</button>
                <button disabled={isLastPage} onClick={()=>setPageIdx(pageIdx+1)}>next page →</button>
            </div>
            <div className="search">
            <label>search by name:</label>
            <input type="text" onChange={(ev)=>setSearchBy(ev.target.value)}/>
            <button onClick={()=>{setPageIdx(0),setSearchTrigger(!searchTrigger)}}>&gt;</button></div>
            <UserList users={users} deleteUser={deleteUser}/>
        </section>
    )
}