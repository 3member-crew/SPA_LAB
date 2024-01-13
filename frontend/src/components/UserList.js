import React, { Component } from "react";
import "../App.css";
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

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
            users: [...prevState.users, user]
        }), () => {
            
        });
    }

    removeUser = (user) => {
        const { users } = this.state;

        const updatedUsers = users.filter((u) => u !== user);

        this.setUsers(updatedUsers);
    }

    render() {
        const { users } = this.state;

        return (
            <div className="userlist-container-inner">
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 4,
                    }}
                >
                    <div>
                        <List
                            variant="outlined"
                            sx={{
                                minWidth: 240,
                                borderRadius: 'sm',
                            }}
                        >
                            {users.map((user, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemDecorator>
                                            <Avatar size="sm" src={`/static/images/avatar/${index + 1}.jpg`} />
                                        </ListItemDecorator>
                                        {user}
                                    </ListItem>
                                    {index !== users.length - 1 && <ListDivider inset="gutter" />}
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                </Box>
            </div>
        );
    };
};

export default UserList;
