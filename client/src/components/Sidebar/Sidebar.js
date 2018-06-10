import React, { Component } from 'react'
import logo from '../../assets/0724383923625xl.jpg'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imgUrl: logo
    }
  }
  render() {
    return (
      <div style={styles.sidebar}>
        <img
          style={styles.img}
          alt="cover"
          src={this.props.imgUrl || this.state.imgUrl}
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
    backgroundColor: '#333',
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