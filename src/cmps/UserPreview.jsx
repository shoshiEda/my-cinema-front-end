/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

export default function UserPreview({user={},deleteUser}){

    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('he-IL', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric',     
        });
    };

    return(
        <div className="user-preview">
            <p>username: <span className="bold">{user.userName}</span></p>
            <p>full name: <span className="bold">{`${user.firstName} ${user.lastName}`}</span></p>
            <p>session time out: <span className="bold">{user.sessionTimeOut}</span></p>
            <p>created at: <span className="bold">{formatDate(user.createdDate)}</span></p>
            <p>permissions: </p>
            <ul>{user.permissions.map(permission=><li className="permission-list" key={permission}>{permission}</li>)}</ul>
            
            <p className="btns">
            <button onClick={()=>navigate(`/user/${user._id}`)}>update</button>
            <button onClick={()=>deleteUser(user._id)}>delete</button>
            </p>
        </div>
    )

}