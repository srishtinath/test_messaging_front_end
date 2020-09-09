import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router';
import ChatHome from './ChatHome';
import { useHistory } from "react-router-dom";


const Home = (props) => {
    let history = useHistory();

    useEffect(() => {
        console.log(localStorage.token)
    }, [])

    const showUserForm = (e) => {
        history.push(`/${e.target.value}`)
    }

    return ( 
        <>
        {/* {localStorage.token ? 
        <ChatHome />
        :  */}
        <div>
            Home page
            <button onClick={showUserForm} value="login">Login</button>
            <button onClick={showUserForm} value="register">Register</button>
        </div>
        {/* } */}
        </>
     );
}
 
export default withRouter(Home);