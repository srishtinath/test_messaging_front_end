import React, {useState, useEffect} from 'react';
import { Switch, Route, withRouter } from 'react-router';

import Home from './components/Home'

import './App.css';
import Login from './components/Login';

const apiUrl = 'http://localhost:3000'

function App(props) {

  const [token, setToken] = useState("")

  useEffect(() =>{
    if (localStorage.token){
      fetch(`${apiUrl}/users/stay_logged_in`, {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(handleFormResponse)
    }
  }, [])

  const renderForm = (routerProps) => {
    if (routerProps.location.pathname === "/login"){
      return <Login formName="Login" handleSubmit={handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register"){
      return <Login formName="Register" handleSubmit={handleRegisterSubmit}/>
    } else {
      return <Login formName="Login" handleSubmit={handleLoginSubmit}/>
    }
  }

  const handleLoginSubmit = (userInfo) => {
    console.log(userInfo)
    console.log("Login form has been submitted")
    fetch(`${apiUrl}/users/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
    .then(r => r.json())
    .then(handleFormResponse)
    
  }

  const handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")
    fetch(`${apiUrl}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(handleFormResponse)
  }

  const handleFormResponse = (resp) => {
    if (resp.message){
      alert(resp.message)
    } else {
      localStorage.token = resp.token
      setToken(resp.token)
      props.history.push('/home')
    }
  }

  const renderHome = () => {
    return <Home />
  }

  const renderWelcome = () => {
    return <div> Welcome? or Home comp?</div>
  }

  return (
    <>

    <div>
      <Switch>
        <Route path="/home" render={renderHome} />
        <Route path="/login" render={renderForm} />
        <Route path="/register" render={renderForm} />
        <Route render={renderWelcome} />
      </Switch>
    </div>

    </>
  );
}

export default withRouter(App);
