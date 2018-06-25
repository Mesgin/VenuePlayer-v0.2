import React from 'react'
const logo = 'https://i.scdn.co/image/fa4a97c948289eb114f583871b3278a352b1987a'

export default function Sidebar(props) {
    return (
      <div className="sidebar">
        <img
          alt="cover"
          src={props.img || logo}
        />
        <iframe
          src={`https://open.spotify.com/embed?uri=spotify:album:${props.nowPlaying}`}
          width="100%"
          allowTransparency="true"
          title="player"
        ></iframe>
      </div>
    )
}