import React, { Component } from 'react';

class Profile extends Component {
    render() {
        const { username } = this.props.currentUser.attributes
        return (
            <div>
                <h3>Profile Page for: </h3>
                <h1>{username}</h1>
            </div>

        )
    }
}

export default Profile