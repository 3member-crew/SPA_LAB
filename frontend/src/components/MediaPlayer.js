import React, { Component, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import "../App.css";

const defaultUrl = 'https://www.youtube.com/watch?v=fgTykFNRbjs';

class MediaPlayer extends Component {
    constructor(props) {
        super(props);

        const isAdmin = this.props.isAdmin;

        this.state = {
            url: defaultUrl,
            currentTime: 0.00,
            isPlaying: false,
            isAdmin: isAdmin,
        };

        this.playerRef = React.createRef();
    }

    checkPlayable = (url) => {
        const player = ReactPlayer.canPlay(url);
        return player;
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

        const validUrl = this.checkPlayable(newUrl);

        if (!validUrl) {
            return;
        }

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

    handleProgress = (progress) => {
        const time = progress.playedSeconds;

        this.setState({ currentTime: time });
    }

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
        const { url, isPlaying, isAdmin } = this.state;

        return (
            <>
                <div onClick={this.handleClick}>
                    <ReactPlayer
                        ref={this.playerRef}
                        url={url}
                        onStart={this.handlePlay}
                        onPlay={this.handlePlay}
                        onPause={this.handlePause}
                        playing={isPlaying}
                        controls={isAdmin}
                        onProgress={this.handleProgress}
                        className='media-player'
                        config={{
                            youtube: {
                                playerVars: {
                                    quality: 'highres',
                                    fs: 1,
                                    // disablekb: (isAdmin ? 0 : 1),
                                    // controls: (isAdmin ? 1 : 0),
                                    // modestbranding: 1,
                                }
                            }
                        }}
                    />
                </div>
                {isAdmin ? (
                    <input type="text" value={'https://www.youtube.com/watch?v=K8nuz6z90cQ'} onChange={this.handleUrlChange} style={{fontSize: '30px', marginTop: '10px', border: '2px solid #512da8', borderRadius: '10px'}} />) : (
                    <></>
                )}
            </>
        );
    }
}

export default MediaPlayer;