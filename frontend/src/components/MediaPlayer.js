import React, { Component, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

const defaultUrl = 'https://www.youtube.com/watch?v=m-omQDaa9R0&pp=ygUFY2hpcGk%3D';

class MediaPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: defaultUrl,
            currentTime: 0.00,
            isPlaying: false
        };
        this.playerRef = React.createRef();
    }

    getCurrentTime = () => {
        return this.state.currentTime;
    }

    getIsPlaying = () => {
        return this.state.isPlaying;
    }

    handleUrlChange = (event) => {
        const newUrl = event.target.value;
        this.setState({ url: newUrl });

        if (this.props.onUrlChange) {
            this.props.onUrlChange(newUrl);
        }
    };

    handlePlay = () => {
        if (this.props.onPlay) {
            const currentTime = this.playerRef.current.getCurrentTime();
            this.setState({ currentTime: currentTime });
            this.props.onPlay(currentTime);
        }
    };

    handlePause = () => {
        if (this.props.onPause) {
            this.props.onPause();
        }
    };

    pause = () => {
        this.setState({ isPlaying: false });
        console.log("player - pause");
    };

    seekTo = (time) => {
        const newTime = (time) ? time : this.state.currentTime;
        
        this.setState({ currentTime: newTime }, () => {
            this.playerRef.current.seekTo(this.state.currentTime);
        });
    }

    play = () => {
        this.setState({ isPlaying: true });
        console.log("player - play");
    };

    seekToAndPlay = (time) => {
        const newTime = (time) ? time : this.state.currentTime;

        this.seekTo(newTime);
        this.play();
    }

    pauseAndSeekTo = (time) => {
        const newTime = (time) ? time : this.state.currentTime;

        this.playerRef.current.pause();
        this.seekTo(time);
    }

    setUrl = (newUrl) => {
        if (newUrl) {
            this.setState({ url: newUrl });
        }
    };

    componentDidMount = () => {
        this.playerRef.current.seekTo(0);
    }

    render() {
        const { url, isPlaying } = this.state;

        return (
            <>
                <input type="text" value={url} onChange={this.handleUrlChange} />
                <ReactPlayer
                    ref={this.playerRef}
                    url={url}
                    onStart={this.handlePlay}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    playing={isPlaying}
                    controls={true}
                    stopOnUnmount={true}
                />
            </>
        );
    }
}

export default MediaPlayer;