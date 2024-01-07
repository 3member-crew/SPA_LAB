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

    client = new W3CWebSocket('ws://127.0.0.1:8000/ws/room/');

    pauseVideo() {
        console.log("pause");
    }
    
    playVideo(currentTime) {
        // currentTime: seconds 
        console.log("play"); 
    }

    videoProgress(progress) {
        console.log("progress", progress.playedSeconds);
    }

    urlChange(newUrl) {
        console.log("url change");
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
                    onUrlChange={this.urlChange}
                />
            </div>
        )
    }
}

export default Room;