import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SongList.css'

const divStyle = {
    marginRight: '5px'
};

class SongsList extends Component {
    render() {
        let songsList = this.props.songs.map((song, i) => {
            return (
            <li key={i} className="list-group-item d-flex" >
                <button
                    style={divStyle}
                    className={(this.props.isPlaying && this.props.currentSong === song.id) ? "btn btn-warning" : "btn btn-success"}
                    type="button"
                    onClick={() => { this.props.listPlay(song.id) }}>
                    <i className={(this.props.isPlaying && this.props.currentSong === song.id) ? "fa fa-pause" : "fa fa-play"}>
                    </i>
                </button>
                <Link to={`/${song.id}`}>{song.artist} - {song.title}</Link>
            </li>
            )
        })
        return <ul className="list-group">{songsList}</ul>
    }
}

export default SongsList