import React, { Component } from 'react'
import SongsList from '../SongsList/SongsList.jsx'
import AudioSpectrum from 'react-audio-spectrum'

class AudioPlayer extends Component {
    constructor() {
        super()

        this.state = {
            currentSong: 0,
            isPlaying: false,
            duration: '0:00',
            currentTime: '0:00'
        }
    }

    play = (id) => {
        this.props.updateSong(id)
        if (this.state.isPlaying) {
            this.setState({
                isPlaying: false,
            }, () => this.player.pause())
        } else {
            this.setState({
                currentSong: id,
                isPlaying: true,
            }, () => this.player.play())
        }
    }

    stop = () => {
        this.player.currentTime = 0
        this.setState({
            isPlaying: false
        }, () => {
            this.player.pause()
        })
    }

    duration = () => {
        let duration = Math.floor(this.player.duration)
        let minutes = Math.floor(duration / 60)
        let seconds = duration % 60

        this.setState({
            duration: minutes + ':' + seconds
        })
    }

    timeUpdate = () => {
        let currentTime = Math.floor(this.player.currentTime)
        let minutes = Math.floor(currentTime / 60)
        let seconds = currentTime % 60 < 10 ? '0' + (currentTime % 60) : currentTime % 60

        this.setState({
            currentTime: minutes + ':' + seconds
        })
    }

    next = () => {
        this.props.updateSong(this.state.currentSong + 1)
        this.setState({
            currentSong: this.state.currentSong + 1,
        }, () => {
            this.player.load();
            (this.state.isPlaying) ? this.player.play() : this.player.pause()
        })
    }

    previous = () => {
        this.props.updateSong(this.state.currentSong - 1)
        this.setState({
            currentSong: this.state.currentSong - 1,
        }, () => {
            this.player.load()
            this.state.isPlaying ? this.player.play() : this.player.pause()
        })
    }

    listPlay = (id) => {
        let num = Number(id)
        this.props.updateSong(num)
        if (this.state.currentSong !== num) {
            this.player.currentTime = 0
            this.setState({
                currentSong: num,
                isPlaying: true
            }, () => this.player.play())
        } else {
            this.play(num)
        }
    }

    render() {
        return (
            <div>
                <div className="row" id="audio-display">
                    <div className="col-md-3">
                        <img id="cover" src={this.props.songs[this.state.currentSong].img} alt="artist-img" />
                    </div>
                    <div className="col-md-9">
                        <AudioSpectrum
                            id="audio-canvas"
                            height={100}
                            width={300}
                            audioId={'audio-element'}
                            capColor={'red'}
                            capHeight={2}
                            meterWidth={10}
                            meterCount={512}
                            meterColor={[
                                { stop: 0, color: '#f00' },
                                { stop: 0.5, color: '#0CD7FD' },
                                { stop: 1, color: 'red' }
                            ]}
                            gap={4}
                        />
                        <p className="lead">
                        {this.props.songs[this.state.currentSong].artist} - {this.props.songs[this.state.currentSong].title} {this.state.currentTime}/{this.state.duration}
                        </p>
                        <div id="controls">
                            <button 
                            className="btn btn-danger btn-width" 
                            type="button" 
                            disabled={(this.state.currentSong === 0)} 
                            onClick={this.previous}>
                                <i className="fa fa-step-backward"></i>
                            </button>
                            <button
                                className={(this.state.isPlaying) ? "btn btn-warning btn-width" : "btn btn-success btn-width"}
                                type="button"
                                onClick={() => { this.play(this.state.currentSong) }
                                }>
                                <i className={(this.state.isPlaying) ? "fa fa-pause" : "fa fa-play"}></i>
                            </button>
                            <button
                                className="btn btn-danger btn-width"
                                type="button"
                                onClick={this.stop}>
                                <i className="fa fa-stop" ></i>
                            </button>
                            <button
                                className="btn btn-danger btn-width"
                                type="button"
                                disabled={(this.state.currentSong === this.props.songs.length - 1)}
                                onClick={this.next}>
                                <i className="fa fa-step-forward"></i>
                            </button>
                        </div>
                    </div >
                </div >

                <audio
                    id="audio-element"
                    onLoadedData={this.duration}
                    onTimeUpdate={this.timeUpdate}
                    src={this.props.songs[this.state.currentSong].source}
                    ref={(self) => { this.player = self }}
                />
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12" id="song-list">
                        <SongsList
                            songs={this.props.songs}
                            isPlaying={this.state.isPlaying}
                            currentSong={this.state.currentSong}
                            listPlay={this.listPlay} />
                    </div>
                </div>
            </div >
        )
    }
}

export default AudioPlayer