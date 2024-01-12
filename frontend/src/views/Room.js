import React, { Component } from 'react';
import MediaPlayer from '../components/MediaPlayer';
import ChatComponent from '../components/ChatComponent';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import client from "../Url";
import "../App.css";


class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {},
            userName: "",
            isAdmin: false,
        }

        this.chatRef = React.createRef();
        this.mediaPlayerRef = React.createRef();

        this.client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/room/test/?token=${localStorage.getItem('token')}`);
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
                const newUrl = 'new-url';
                this.setUrl(newUrl);
            }
        }

        this.getRoom();
    }

    getRoom = async () => {
        const roomName = "room";

        await client.get("/v1/rooms/get/", {
            params: { name: roomName }
        })
        .then(response => {
            const room = response.data.room; // id + creater + roomName 
            const isAdmin = response.data.isAdmin;

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

    handlePause = () => {
        if (!this.state.isAdmin) {
            return;
        }

        console.log("pause");

        this.client.send(JSON.stringify({
            "type": "signal",
            "signal": "pause",
        }));
    }

    handlePlay = (currentTime) => {
        if (!this.state.isAdmin) {
            return;
        }

        console.log("play");

        this.client.send(JSON.stringify({
            type: "signal",
            signal: "play",
            currentTime: currentTime
        }));
    }

    handleVideoProgress = (progress) => {
        console.log("progress", progress.playedSeconds);
    }

    handleUrlChange = (newUrl) => {
        console.log("url change");

        this.client.send(JSON.stringify({
            "type": "signal",
            "message": "play",
            "currentTime": newUrl,
            "token": localStorage.getItem('token'),
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

    requireAuth = (nextState, replace, next) => {
        if (!localStorage.getItem('token')) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname }
            })
        }

        next();
    }

    click1 = () => {
        this.mediaPlayerRef.current.play();
    }

    click2 = () => {
        this.mediaPlayerRef.current.pause();
    }

    render() {
        return (
            <div className="room-container">
                <div className="left-side-container">
                    <MediaPlayer
                        ref={this.mediaPlayerRef}
                        onPlay={this.handlePlay}
                        onPause={this.handlePause}
                        onUrlChange={this.handleUrlChange}
                    />
                    <button onClick={this.click1}>set play</button>
                    <button onClick={this.click2}>set pause</button>
                </div>
                <div className="right-side-container">
                    <ChatComponent
                        ref={this.chatRef}
                    />
                </div>
            </div>
        );
    }
}

export default Room;
