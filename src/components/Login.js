import React, { useState } from 'react';

const Login = (props) => {

    const [username, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSubmit({username, password})
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return ( <>
        <div className="login-form">
            <h1>{props.formName}</h1>
            <form onSubmit={handleSubmit} >
                <input type="text" name="name" value={username} onChange={handleName} placeholder="Enter username"></input>
                <input type="password" name="password" value={password} onChange={handlePassword} placeholder="Enter password"></input>
                <input type="submit"/>
            </form>

            <br></br>
        </div>

        </> );
}
 
export default Login;