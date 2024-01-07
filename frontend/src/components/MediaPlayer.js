import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';

function MediaPlayer({ onPlay, onPause, onSeek }) {
    const [url, setUrl] = useState('https://youtu.be/E5gvllH2fag');

    const HandleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handlePlay = () => {
        console.log("play - inner");
        if (onPlay) {
            onPlay();
        }
    };
    
    const handlePause = () => {
        console.log("pause - inner");
        if (onPause) {
            onPause();
        }
    };
    
    const handleSeek = () => {
        console.log("seek - inner");
        if (onSeek) {
            onSeek();
        }
    }

    return (
        <>
            <input type="text" value={url} onChange={HandleUrlChange} />
            <ReactPlayer
                url={url}
                onPlay={handlePlay}
                onPause={handlePause}
                onSeek={handleSeek}
            />
        </>
    )
}

export default MediaPlayer;