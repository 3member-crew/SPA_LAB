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

    client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/room/test/?token=${localStorage.getItem('token')}`);

    pauseVideo = () => {
        console.log("pause");

        this.client.send(JSON.stringify({
            "type": "signal",        
            "signal": "pause",
        }));
    }
    
    playVideo = (currentTime) => {
        // currentTime: seconds 
        console.log("play"); 

        this.client.send(JSON.stringify({
            "type": "signal",
            "signal": "play",
        }));
    }

    videoProgress = (progress) => {
        console.log("progress", progress.playedSeconds);
    }

    urlChange = (newUrl) => {
        console.log("url change");

        this.client.send(JSON.stringify({
            "type": "signal",
            "signal": "play",
            "newURL": newUrl
        }));
    }

    componentDidMount = () => {
        console.log("componentDidMount");

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        this.client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            const signal = dataFromServer.signal;
            console.log('signal here' + signal)

            if (signal == 'play') {

            }
            if (signal == 'pause') {

            }
            if (signal == 'url_change') {

            }

            }
        };


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