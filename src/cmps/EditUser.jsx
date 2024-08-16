import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser,UpdateUser } from "../services/user.service"

export default function EditUser() {

    const navigate = useNavigate()
    
    const { id } = useParams()
    const [user,setUser] = useState({
        userName:"",
        firstName:"",
        lastName:"",
        sessionTimeOut:0,
        permissions:[]
    })
    const permissionList=["View Subscriptions","Create Subscriptions","Delete Subscriptions","Update Subscription","View Movies","Create Movies","Delete Movies","Update Movie"]

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const tempUser = await getUser(id)
                    setUser(tempUser)
                } catch (err) {
                    console.error('Error fetching user:', err)
                }
            }
        }

        fetchUser()
    }, [id])

    const handleCheckboxChange = (ev,permission) => {
        let userNewPermisions
        if(ev.target.checked){
            userNewPermisions=[...user.permissions,permission]
            setUser({...user,permissions:userNewPermisions})
        }
        else{
            userNewPermisions=user.permissions.filter(per=>per!==permission)
            setUser({...user,permissions:userNewPermisions})
        }

    }

    const Update = async(id,user)=>{
        const status = await UpdateUser(id,user)
        if(status==='ok') navigate('/users')
    }
    
if(!user) return <div>Loading...</div>
return(
    <section className='edit-user'>
    <h1>Edit user</h1>
    <label>user name:</label><br/>
    <input type="text" value={user.userName} onChange={(ev)=>setUser({...user,userName:ev.target.value})}/>
    <br/>
    <label>first name:</label><br/>
    <input type="text" value={user.firstName} onChange={(ev)=>setUser({...user,firstName:ev.target.value})}/>
    <br/>
    <label>last name:</label><br/>
    <input type="text" value={user.lastName} onChange={(ev)=>setUser({...user,lastName:ev.target.value})}/>
    <br/>
    <label>session time out:</label><br/>
    <input type="number" value={user.sessionTimeOut} onChange={(ev)=>setUser({...user,sessionTimeOut:ev.target.value})}/>
    <br/>
    <p>permissions:</p>
    {permissionList.map(permission=> (
        <div key={permission}>
        <input type="checkbox" checked={user.permissions.includes(permission)} onChange={(ev)=>handleCheckboxChange(ev,permission)} />
        {permission}
   
    </div>
    ))}
    <button onClick={()=>navigate('/users')}>Back</button>
    <button onClick={()=>Update(id,user)}>Update</button>
    </section>
)
   
}