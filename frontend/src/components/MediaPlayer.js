import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';

function MediaPlayer({ onPlay, onPause, onSeek, onProgress }) {
    const [url, setUrl] = useState('https://youtu.be/E5gvllH2fag');
    const playerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

    const HandleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handlePlay = () => {
        if (onPlay) {
            const currentTime = playerRef.current.getCurrentTime();
            onPlay(currentTime);
        }
    };

    const handlePause = () => {
        if (onPause) {
            onPause();
        }
    };

    const handleProgress = (progress) => {
        if (onProgress) {
            // setCurrentTime(progress.playedSeconds);
            onProgress(progress);
        }
    };

    return (
        <>
            <input type="text" value={url} onChange={HandleUrlChange} />
            <ReactPlayer
                ref={playerRef}
                url={url}
                controls={true}
                onPlay={handlePlay}
                onPause={handlePause}
                onProgress={handleProgress}
            />
        </>
    )
}

export default MediaPlayer;