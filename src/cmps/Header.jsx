import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout } from "../services/auth.service"

export default function Header(){

    const loggedInUser = useSelector((state) => state.systemModule.loggedInUser);

    const Logout = ()=>{
        logout()
    }

    return(
        <section className="header">
            <h3 className="logo"><NavLink to='/'>MY CIMEMA</NavLink> </h3>
            <nav>
                <NavLink to='/' >Home</NavLink> 
                {loggedInUser.isAdmin && <NavLink to='/users' >Users</NavLink> }
                {loggedInUser.permissions.includes("View Movies") && <NavLink to='/movies' >Movies</NavLink> }
                {loggedInUser.permissions.includes("View Subscriptions") && <NavLink to='/members'>Members</NavLink> }
            </nav>
            <div>
                <p> hello {loggedInUser.userName}, </p>
                <button onClick={Logout}>Logout</button>
            </div>
        </section>
    )
}
