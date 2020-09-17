import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Rooms from './components/Rooms';
import RoomShow from './components/RoomShow';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      allRooms: [],
      currentRoom: {
        room: {}, 
        users: [],
        messages: []
      }
    }
  }

  componentDidMount() {
    if (localStorage.token){
      fetch("http://localhost:3000/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(console.log)
    }

    fetch('http://localhost:3000/chat_rooms')
    .then(resp => resp.json())
    .then(result => {
      this.setState({
        allRooms: result.data
      })
    })
  }


  updateCurrentUser = (data) => {
    this.setState({
      currentUser: data
    })
  }

  logout = () => {
    localStorage.token = ""
    this.setState({
      currentUser: null
    })
    return <Redirect to='/home' />
  }

  updateAppStateRoom = (newRoom) => {
    this.setState({
      currentRoom: {
        room: newRoom.room.data,
        users: newRoom.users,
        messages: newRoom.messages
      }
    })
  }

  getRoomData = (id) => {
    fetch(`http://localhost:3000/rooms/${id}`)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      this.setState({
        currentRoom: {
          room: result.data,
          users: result.data.attributes.users,
          messages: result.data.attributes.messages
        }
      })
    })
  }

  subscribeToRoom = (event) => {
    const room_id = event.target.id
    this.state.currentUser ? (this.postFirstMessage(room_id)) : (alert('You must be logged in to subscribe to a room.'))
  }

  postFirstMessage = (roomId) => {
    window.history.pushState(null, null, `/rooms/${roomId}`)
    const message = {
      content: `${this.state.currentUser.attributes.username} has joined this room!`,
      user_id: this.state.currentUser.id,
      room_id: roomId
    }
    fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({message: message})
    })
    .then(resp => resp.json())
    .then(result => {
        console.log(result)
    })
  }

  render() {
    return (
      <Fragment>
        <NavBar currentUser={this.state.currentUser} logout={this.logout} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={() => {
            return this.state.currentUser ?
            <Redirect to='/profile' /> :
            <Login updateCurrentUser={this.updateCurrentUser} />
          }} />
          <Route exact path='/create_account' render={(props) => <CreateAccount updateCurrentUser={this.updateCurrentUser} routeProps={props} />} />
          <Route exact path='/profile' render={() => {
            return this.state.currentUser ? 
            <Profile currentUser={this.state.currentUser} /> :
            <Login updateCurrentUser={this.updateCurrentUser} />
          }} />
          <Route exact path='/rooms' render={ (props) => (
            <Rooms 
              allRooms={this.state.allRooms}
              currentUser={this.state.currentUser}
              handleSubscribe={this.subscribeToRoom}
            />
          )} />
          <Route exact path='/rooms/:id' render={ (props) => {
            return this.state.currentUser ?
            (<RoomShow
              {...props}
              cableApp={this.props.cableApp}
              getRoomData={this.getRoomData}
              updateApp={this.updateAppStateRoom}
              roomData={this.state.currentRoom}
              currentUser={this.state.currentUser}
            />
            ) : (
              <Redirect to='/rooms' />
            )
            }} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }

}

export default withRouter(App);