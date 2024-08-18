import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateMember ,AddMember } from "../services/member.service"
import { GET_MEMBER } from '../redux/member.reducer'
import { useDispatch,useSelector } from 'react-redux'

export default function EditMember() {

    const navigate = useNavigate()
    
    const { memberId:id } = useParams()
    const chosenMember = useSelector(state=>  state.memberModule.chosenMember)
    const [member,setMember] = useState({
        name:"",
        email:"",
        city:""
    })

    const dispatch = useDispatch()  
   
        useEffect(() => {
            if (id !== 'add') {
                dispatch({ type: GET_MEMBER, payload: id });
            }
        }, [id])
        
        useEffect(() => {
            if (chosenMember) {
                setMember(chosenMember);
            }
        }, [chosenMember])
        


    const Update = async(id,member)=>{
        try{
        const status = await UpdateMember(id,member)
        if(status==='ok') navigate('/members')
        } catch (err) {
            console.error('Error updating member:', err)
        }
    }

    const Add = async(member)=>{
        try{
        const status = await AddMember(member)
        console.log(status)
        if(status==='ok') navigate('/members')
        } catch (err) {
            console.error('Error adding member:', err)
        }
    }

   
if(!member) return <div>Loading...</div>
return(
    <section className='edit-member'>
    <h1>{id!=='add'? 'Edit ' : 'Add a new '} member</h1>
    <label>Name:</label><br/>
    <input type="text" value={member.name} onChange={(ev)=>setMember({...member,name:ev.target.value})}/>
    <br/>
    <label>Email:</label><br/>
    <input type="text" value={member.email} onChange={(ev)=>setMember({...member,email:ev.target.value})}/>
    <br/>
    <label>City:</label><br/>
    <input type="text" value={member.city} onChange={(ev)=>setMember({...member,city:ev.target.value})}/>
    <br/>
   <br/>
   
   
    <button onClick={()=>navigate('/members')}>Back</button>
    <button onClick={()=>id!=='add'? Update(id,member) : Add(member)}>{id!=='add'? 'Update' : 'Add'}</button>
    </section>
)
   
}