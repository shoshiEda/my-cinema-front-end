/* eslint-disable react/prop-types */
import MemberPreview from "./MemberPreview"

export default function MovieList({members,deleteMember}){

    return(
        <ul className="member-list">
        {members.map(member => <MemberPreview key={member._id} member={member} deleteMember={deleteMember} />)}
        </ul>
    )
} 