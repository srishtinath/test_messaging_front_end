import React, { Component, useState } from 'react';

const Login = (props) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSubmit(name, password)
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
                <input type="text" name="name" value={name} onChange={handleName} placeholder="Enter name"></input>
                <input type="password" name="password" value={password} onChange={handlePassword} placeholder="Enter password"></input>
                <input type="submit"/>
            </form>

            <br></br>
        </div>

        </> );
}
 
export default Login;