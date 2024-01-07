import React, { Component } from 'react';
import MediaPlayer from '../components/MediaPlayer';
import { w3cwebsocket as W3CWebSocket } from "websocket";


class Room extends Component {
    state = {
        isLoggedIn: false,
        messages: [],
        value: '',
        name: '',
        room: 'test',
    }

    client = new W3CWebSocket('ws://localhost:8000/ws/room/' + this.state.room + '/');

    pauseVideo() {
        console.log("pause");
    }
    
    playVideo() {
        console.log("play");
    }

    changeVideoTime() {
        console.log("seek");
    }

    onButtonClicked = (e) => {
        this.client.send(JSON.stringify({
            type: "signal",
            message: this.state.value,
            name: this.state.name
        }));
        this.state.value = ''
        e.preventDefault();
    }

    componentDidMount() {
        console.log("componentDidMount");

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        this.client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer.type);

            if (dataFromServer) {
                this.setState((state) =>
                ({
                    messages: [...state.messages,
                    {
                        msg: dataFromServer.message,
                        name: dataFromServer.name,
                    }]
                })
                );
            }
        };
    }


    requireAuth(nextState, replace, next) {
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
            <div>
                <MediaPlayer 
                    onPlay={this.playVideo}
                    onPause={this.pauseVideo}
                    onSeek={this.changeVideoTime}
                />
            </div>
        )
    }
}

export default Room;