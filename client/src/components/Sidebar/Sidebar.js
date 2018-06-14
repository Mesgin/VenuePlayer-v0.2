import React, { Component } from 'react'
const logo = 'https://i.scdn.co/image/fa4a97c948289eb114f583871b3278a352b1987a'

export default class Sidebar extends Component {
  render() {
    let { img, nowPlaying } = this.props
    return (
      <div className="sidebar">
        <img
          alt="cover"
          src={img || logo}
        />
        <iframe
          src={`https://open.spotify.com/embed?uri=spotify:album:${nowPlaying}`}
          width="100%"
          height="62.4%"
          allowTransparency="true"
          title="player"
        ></iframe>
      </div>
    )
  }
}