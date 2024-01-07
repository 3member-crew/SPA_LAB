import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';

const defaultUrl = 'https://youtu.be/0tOXxuLcaog';

function MediaPlayer({ onPlay, onPause, onProgress, onUrlChange }) {
    const [url, setUrl] = useState(defaultUrl);
    const playerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

    const HandleUrlChange = (event) => {
        const newUrl = event.target.value;
        setUrl(newUrl);

        if (onUrlChange) {
            onUrlChange(newUrl);
        }
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