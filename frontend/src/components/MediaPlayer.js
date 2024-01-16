import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy';
import "../App.css";

const defaultUrl = 'https://youtu.be/0tOXxuLcaog';

class MediaPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: defaultUrl,
            currentTime: 0.00,
            isPlaying: false,
            isAdmin: true,
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
            const currentTime = this.state.currentTime;
            this.props.onPlay(currentTime);
        }
    };

    handlePause = () => {
        if (this.props.onPause) {
            this.props.onPause();
        }
    };

    handleProgress = (progress) => {
        this.setState({ currentTime: progress.playedSeconds });

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
                <div>
                    <ReactPlayer
                        ref={this.playerRef}
                        url={url}
                        onStart={this.handlePlay}
                        onPlay={this.handlePlay}
                        onPause={this.handlePause}
                        playing={isPlaying}
                        controls={true}
                        onProgress={this.handleProgress}
                        className='media-player'
                    />
                </div>
                {this.state.isAdmin ? (<input type="text"value={url} onChange={this.handleUrlChange}></input>) : (<></>)}
            </>
        );
    }
}

export default MediaPlayer;

