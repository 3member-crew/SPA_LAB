import React, { Component } from 'react';
import MediaPlayer from '../components/MediaPlayer';
import Chat from '../components/Chat';
import UserList from '../components/UserList';
import PlayList from '../components/Playlist';
import Switcher from '../components/Switcher';
import withRouter from '../components/withRouter';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { decode } from "base-64";
import client from "../Url";
import "../App.css";


class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {},
            userName: "",
            isAdmin: false,
            rightSideItem: "chat",
            messages: [],
            users: [],
        }

        this.chatRef = React.createRef();
        this.mediaPlayerRef = React.createRef();
        this.userListRef = React.createRef();

        const roomName = this.getRoomName();

        this.client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/room/${roomName}/?token=${localStorage.getItem('token')}`);
    }

    componentDidMount = () => {
        this.client.onopen = () => {
            console.log('WebSocket Client Connected');


        };

        this.client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            const signal = dataFromServer.signal

            if (signal === 'play') {
                const time = dataFromServer.currentTime;

                if (!this.state.isAdmin) {
                    this.setPlay(time);
                }
            }
            if (signal === 'pause') {
                this.setPause();
            }
            if (signal === 'url_change') {
                const newUrl = dataFromServer.new_url;
                console.log(newUrl)
                this.setUrl(newUrl);
            }
            if (signal === 'chat') {
                const msgText = dataFromServer.text;
                const sender = dataFromServer.sender;
                const { userName } = this.state;

                const message = this.chatRef.current.createMessage(msgText, sender, userName);

                this.setState(prevState => ({
                    messages: [...prevState.messages, message]
                }), () => {
                    this.updateChatMessageList();
                });
            }
            if (signal === "user_list") {
                const users = dataFromServer.members;

                this.setState({ users: users });
            }
            if (signal === "room_state") {
                const currentTime = dataFromServer.currentTime;
                const currentVideoState = dataFromServer.currentVideoState;
            }
        }

        this.getRoom();

        this.getCurrentUser();
    }

    getRoom = async () => {
        const roomName = this.getRoomName();

        await client.get("/v1/rooms/get/", {
            params: { name: roomName }
        })
            .then(response => {
                const room = response.data.room;
                const isAdmin = response.data.isAdmin;
                const url = response.data.room.url;

                this.setUrl(url);

                // console.log(response.data);

                this.setState({
                    room: room,
                    isAdmin: isAdmin,
                });
            })
            .catch(e => {
                const exception = e['response']['data']['error'];
                console.log(exception);
            });
    }

    getCurrentUser = async () => {
        await client.get("/auth/profile/")
            .then(response => {
                const userName = response.data.username;

                this.setState({ userName: userName });
            })
            .catch(e => {
                const exception = e['response']['data']['error'];
                console.log(exception);
            });
    }

    getRoomName = () => {
        const { location } = this.props.router;
        const path = location.pathname;
        const parts = path.split('/');
        const encodedRoomName = parts[parts.length - 1];
        const roomName = decode(encodedRoomName); // Decode the encoded room name

        return roomName;
    }

    handlePause = () => {
        if (!this.state.isAdmin) {
            return;
        }

        console.log("pause");

        this.client.send(JSON.stringify({
            signal: "pause",
        }));
    }

    handlePlay = (currentTime) => {
        if (!this.state.isAdmin) {
            return;
        }

        console.log("play");

        this.client.send(JSON.stringify({
            signal: "play",
            currentTime: currentTime
        }));
    }

    handleVideoProgress = (progress) => {
        console.log("progress", progress.playedSeconds);
    }

    handleUrlChange = (newUrl) => {
        if (!this.state.isAdmin) {
            return;
        }

        console.log(`new url: ${newUrl}`);

        this.client.send(JSON.stringify({
            signal: "url_change",
            new_url: newUrl,
        }));
    }

    setPause = () => {
        if (this.mediaPlayerRef.current) {
            console.log("setPause");
            this.mediaPlayerRef.current.pause();
        }
    }

    setPlay = (time) => {
        if (this.mediaPlayerRef.current) {
            console.log("setPlay");
            this.mediaPlayerRef.current.seekToAndPlay(time);
        }
    }

    setProgress = (progress) => {
        if (this.mediaPlayerRef.current) {
            console.log("setProgress");
            this.mediaPlayerRef.current.setProgress(progress);
        }
    }

    setUrl = (newUrl) => {
        if (this.mediaPlayerRef.current) {
            console.log("setUrl");
            this.mediaPlayerRef.current.setUrl(newUrl);
        }
    }

    updateChatMessageList = () => {
        const { messages } = this.state;

        this.chatRef.current.setMessageList(messages);
    }

    handleSendMessage = (message) => {
        this.client.send(JSON.stringify({
            signal: "chat",
            text: message.text,
            sender: message.title,
        }));
    }

    handleSwitcherChange = (selectedOptions) => {
        if (selectedOptions.length > 0) {
            const rightSideItem = selectedOptions[0].value;
            this.setState({ rightSideItem });
        }
    };

    handleHomeClick = async () => {
        console.log("Home button clicked");
        const { roomName } = this.state.room.name;

        await client.delete("/v1/rooms/leave/", {
            params: {
                name: roomName
            }
        }).then(response => {
            const msg = response.data.message;
        })

    };

    renderRightSideComponent() {
        const { rightSideItem, messages, userName, users } = this.state;

        switch (rightSideItem) {
            case "chat":
                return (
                    <Chat
                        ref={this.chatRef}
                        messages={messages}
                        userName={userName}
                        onSendMessage={this.handleSendMessage}
                        key={userName}
                    />
                );
            case "playlist":
                return <PlayList />;
            case "userlist":
                return (
                    <UserList
                        ref={this.userListRef}
                        users={users}
                        key={users}
                    />
                );
            default:
                return null;
        }
    }

    requireAuth = (nextState, replace, next) => {
        if (!localStorage.getItem('token')) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname }
            })
        }

        next();
    }

    render() {
        return (
            <div className="room-container">
                <div className="left-side-container">
                    <span>
                        <button onClick={this.handleHomeClick}>На главную</button>
                        <div>
                            {this.state.room.name}
                        </div>
                    </span>
                    <MediaPlayer
                        ref={this.mediaPlayerRef}
                        onPlay={this.handlePlay}
                        onPause={this.handlePause}
                        onUrlChange={this.handleUrlChange}
                    />
                </div>
                <div className="right-side-container">
                    <Switcher onChange={this.handleSwitcherChange} />
                    {this.renderRightSideComponent()}
                </div>
            </div >
        );
    }
}

export default withRouter(Room);
