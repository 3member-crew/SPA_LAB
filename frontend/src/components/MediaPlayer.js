import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy';

const defaultUrl = 'https://youtu.be/0tOXxuLcaog';

class MediaPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: defaultUrl,
            currentTime: 0.00,
            isPlaying: false,
            played: 0
        };
        this.playerRef = React.createRef();
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
            this.props.onPlay(currentTime);
        }
    };

    handlePause = () => {
        if (this.props.onPause) {
            this.props.onPause();
        }
    };

    handleProgress = (progress) => {
        this.setState({ played: progress.playedSeconds });

        if (this.props.onProgress) {
            this.props.onProgress(progress);
        }
    };

    pause = () => {
        this.setState({ isPlaying: false });
    };

    seekTo = (time) => {
        if (time) {
            this.setState({ currentTime: time });
        } 
        
        this.playerRef.current.seekTo(this.state.currentTime);
    }

    play = () => {
        this.setState({ isPlaying: true });
    };

    setProgress = (progress) => {
        if (progress) {
            this.setState({ played: progress.playedSeconds });
            this.playerRef.current.seekTo(progress.playedSeconds);
        }
    }

    setUrl = (newUrl) => {
        if (newUrl) {
            this.setState({ url: newUrl });
        }
    };

    render() {
        const { url, isPlaying } = this.state;

        return (
            <>
                <input type="text" value={url} onChange={this.handleUrlChange} />
                <ReactPlayer
                    ref={this.playerRef}
                    url={url}
                    onReady={() => {
                        //   videoRef.current.seekTo(room.played);
                    }}
                    onStart={this.handlePlay}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    playing={isPlaying}
                    controls={true}
                    onProgress={this.handleProgress}
                />
            </>
        );
    }
}

export default MediaPlayer;