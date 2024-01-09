import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';

function MediaPlayer() {
    const [url, setUrl] = useState('https://youtu.be/E5gvllH2fag');

    const HandleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    return (
        <>
            <input type="text" value={url} onChange={HandleUrlChange} />
            <ReactPlayer
                url={url}
            />
        </>
    )
}

export default MediaPlayer;