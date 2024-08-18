import { useSelector } from "react-redux";
import { useEffect , useState } from "react";
import { useNavigate } from 'react-router-dom';


import { loadMembers, deleteMember } from "../services/member.service"
import MemberList from "./MemberList"

export default function ViewMembers(){

    const limitPerPage = 10

    const navigate = useNavigate()

    const members = useSelector((state) => state.memberModule.members)
    const loggedInUser = useSelector((state) => state.systemModule.loggedInUser);

    const [searchBy,setSearchBy] = useState("")
    const [pageIdx,setPageIdx] = useState(0)
    const [isLastPage,setIsLastPage] = useState(false)
    const [searchTrigger, setSearchTrigger] = useState(false)

    useEffect(()=>{
        const fetchMembers = async()=>{
           
            const lastPage = await loadMembers({searchBy,pageIdx,limitPerPage})
            setIsLastPage(lastPage)
        }
        fetchMembers()
    },[pageIdx,searchTrigger])

    


    if(!members || !members.length) return <div>There are no members found</div>
    return(
        <section className="member-container">
            <h1 className="member-header">Members:</h1>
            <div className="pagination">
                <button disabled={pageIdx === 0} onClick={()=>setPageIdx(pageIdx-1)}>← prev page</button>
                <button disabled={isLastPage} onClick={()=>setPageIdx(pageIdx+1)}>next page →</button>
            </div>
            {loggedInUser.permissions.includes("Create Subscriptions") && <button onClick={()=>navigate(`/member/add`)}>Add new member</button>}
            <div className="search">
            <label>search by name:</label>
            <input type="text" onChange={(ev)=>setSearchBy(ev.target.value)}/>
            <button onClick={()=>{setPageIdx(0),setSearchTrigger(!searchTrigger)}}>&gt;</button></div>
            <br/>            
            <MemberList members={members} deleteMember={deleteMember}/>
        </section>
    )
}