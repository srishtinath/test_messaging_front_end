import React, { Component } from 'react';

class CreateAccount extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            avatar: {}
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.password === this.state.passwordConfirmation) {
            fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: {
                username: this.state.username,
                password: this.state.password
            }})
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('jwt_token', data.token)
        })
        } else {
            alert('Your password was not confirmed')
        } 
    }

    render() {
        return (
              <div>
                <h3>Create an Account</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='username' value={this.state.username} onChange={(e) => this.handleChange(e)} placeholder='username' />
                    <input type='password' name='password' onChange={(e) => this.handleChange(e)} placeholder='password' />
                    <input type='password' name='passwordConfirmation' onChange={(e) => this.handleChange(e)} placeholder='confirm password' />
                    <input type='submit' value='Create Account' />
                </form>
              </div>
            )
        }
}

export default CreateAccount