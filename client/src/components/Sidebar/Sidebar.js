import React, { Component } from 'react'
const logo =  'https://i.scdn.co/image/fa4a97c948289eb114f583871b3278a352b1987a'

export default class Sidebar extends Component {
  render() {
    return (
      <div style={styles.sidebar}>
        <img
          style={styles.img}
          alt="cover"
          src={this.props.img || logo}
        />
        <iframe
          style={styles.iframe}
          src={`https://open.spotify.com/embed?uri=spotify:album:${this.props.nowPlaying}`}
          width="100%"
          height="62.4%"
          allowTransparency="true"
          title="player"
        ></iframe>
      </div>
    )
  }
}

const styles = {
  sidebar: {
    height: '100%',
    width: '260px',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: 'black',
    overflowX: 'hidden'
  },
  img: {
    display: 'block',
    height: '37%',
    textAlign: 'center',
    width: '100%'
  },
  iframe: {
    border: 0
  }
}