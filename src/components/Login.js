import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit = (e) => {
        e.preventDefault()
        console.log("Login form has been submitted")
        fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
        .then(r => r.json())
        .then(this.handleLoginResponse)
    }

    handleLoginResponse = (resp) => {
        if (resp.message){
          alert(resp.message)
        } else {
          localStorage.token = resp.token
          this.setState({
            token: resp.token
          })
          this.props.history.push('/')
      }
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={(e) => this.handleLoginSubmit(e)} >
                    <input type='text' name='username' value={this.state.username} onChange={(e) => this.handleChange(e)} placeholder='username' />
                    <input type='password' name='password' onChange={(e) => this.handleChange(e)} placeholder='password' />
                    <input type='submit' value='Login' />
                </form>
            </div>
        )
    }
}

export default withRouter(Login)