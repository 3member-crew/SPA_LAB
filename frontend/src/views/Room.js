import React, { Component, useRef } from 'react';
import MediaPlayer from '../components/MediaPlayer';
import ChatComponent from '../components/ChatComponent';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "../App.css";


const Room = () => {
    // state = {
    //     isLoggedIn: false,
    //     messages: [],
    //     value: '',
    //     name: '',
    //     room: 'test',
    // }

    const mediaPlayerRef = useRef();
    const chatRef = useRef();

    const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/room/test/?token=${localStorage.getItem('token')}`);

    const handlePause = () => {
        console.log("pause");

        client.send(JSON.stringify({
            "type": "signal",
            "signal": "pause",
        }));
    }

    const handlePlay = (currentTime) => {
        console.log("play");

        client.send(JSON.stringify({
            type: "signal",
            signal: "play",
            currentTime: currentTime
        }));
    }

    const handleVideoProgress = (progress) => {
        console.log("progress", progress.playedSeconds);
    }

    const handleUrlChange = (newUrl) => {
        console.log("url change");

        client.send(JSON.stringify({
            "type": "signal",
            "message": "play",
            "currentTime": newUrl,
            "token": localStorage.getItem('token'),
        }));
    }

    const setPause = () => {
        if (mediaPlayerRef.current) {
            console.log("set pause");
            mediaPlayerRef.current.pause();
        }
    }

    const setPlay = (time) => {
        if (mediaPlayerRef.current) {
            mediaPlayerRef.current.seekTo(time);
            mediaPlayerRef.current.play();
        }
    }

    const setProgress = (progress) => {
        if (mediaPlayerRef.current) {
            console.log("set progress");
            mediaPlayerRef.current.setProgress(progress);
        }
    }

    const setUrl = (newUrl) => {
        if (mediaPlayerRef.current) {
            console.log("set url");
            mediaPlayerRef.current.setUrl(newUrl);
        }
    }


    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        const signal = dataFromServer.signal

        if (signal === 'play') {
            const time = dataFromServer.currentTime;

            const userIsAdmin = true;

            if (!userIsAdmin) { 
                setPlay(time);
            }
        }
        if (signal === 'pause') {
            setPause();
        }
        if (signal === 'url_change') {
            const newUrl = 'new-url';
            setUrl(newUrl);
        }
    }

    const requireAuth = (nextState, replace, next) => {
        if (!localStorage.getItem('token')) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname }
            })
        }

        next();
    }

    return (
        <div className="room-container">
            <div className="left-side-container">
                <MediaPlayer
                    ref={mediaPlayerRef}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onUrlChange={handleUrlChange}
                />
            </div>
            <div className="right-side-container">
                <ChatComponent
                    ref={chatRef}
                />
            </div>
        </div>
    );
}

export default Room;

