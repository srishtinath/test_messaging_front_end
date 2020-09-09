import React, { useEffect } from 'react';
import {withRouter} from 'react-router';
import ChatHome from './ChatHome';
import { useHistory } from "react-router-dom";


const Home = (props) => {
    let history = useHistory();

    // useEffect(() => {
    //     console.log(localStorage.token)
    // }, [])

    const showUserForm = (e) => {
        history.push(`/${e.target.value}`)
    }

    const handleLogout = (e) => {
        localStorage.token = ""
        history.push("/home")

    }

    return ( 
        <>
        {localStorage.token ? 
        <>
        <ChatHome />
        <button onClick={handleLogout}>Logout</button>
        </>
        : 
        <div>
            Home page
            <button onClick={showUserForm} value="login">Login</button>
            <button onClick={showUserForm} value="register">Register</button>
        </div>
        }
        </>
     );
}
 
export default withRouter(Home);