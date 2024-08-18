/* eslint-disable react/prop-types */
import UserPreview from "./UserPreview"

export default function UserList({users,deleteUser}){

    return(
        <ul className="user-list">
        {users.map(user => <UserPreview key={user._id} user={user} deleteUser={deleteUser} />)}
        </ul>
    )
}
