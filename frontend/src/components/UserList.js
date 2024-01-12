import React, { Component } from "react";
import "../App.css";


class UserList extends Component {
    constructor(props) {
        super(props);

        const users = props.users ? props.users : [];

        this.state = {
            users: users,
        };
    }

    setUsers = (users) => {
        this.setState({ users: users });
    }

    addUser = (user) => {
        this.setState(prevState => ({
            messages: [...prevState.users, user]
        }));
    }

    removeUser = (user) => {
        const { users } = this.state;

        const updatedUsers = users.filter((u) => u !== user);

        this.setUsers(updatedUsers);
    }

    render() {
        return (
            <div className="userlist-container-inner">
                
            </div>
        )
    }
}

export default UserList;

