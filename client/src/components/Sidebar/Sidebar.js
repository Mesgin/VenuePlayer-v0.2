import React, { Component } from 'react'
import logo from '../../assets/0724383923625xl.jpg'
const styles = {
  sidebar: {
    height: '100%',
    width: '260px',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#333',
    overflowX: 'hidden',
    // borderRightColor: 'green',
    // borderRightWidth: '2px',

  },
  img: {
    // margin: 0,
    display: 'block',
    // top: 0,
    height:'37%',
    // padding: '2px',
    textAlign: 'center',
    width: '100%'
  },
  iframe: {
    border: 0
  }
}

const token = 'access_token=BQAz0-PaX_iKeArVh5yuc_bl6w3YreL-xWRhEm-J94iUk3izn5xHu1GvfkQ64Kaa2dOOoFusM6lbXxpjbTmKjLYANv6tDziZSms9pAnt701VzBRYj9rpBTU_7V1hB4FIsNiaIHieiYkt3nwQGcYM0Ug7CQPkHxkkfOs0DgD-Xz2cgW_Q1yBUGMk&refresh_token=AQDxgoC2JfMOHpKo9iWdPEJmbz-NC51pl-8G5SbWRCOO16LVMNfsV1v_MdSJrCjPNcM5kpVc5zk6lgl4MsMJwbgwgSBIbuCWuLxzbkFQNJ7JQYrnsX4J171M8pqcKJ6dxGc'

export default class Sidebar extends Component {
  constructor(props){
    super(props)

    this.state = {
      imgUrl: logo
    }
  }
  render() {
    return (
      <div style={styles.sidebar}>
        <img style={styles.img} alt="cover" src={this.props.imgUrl || this.state.imgUrl} />
        <iframe style={styles.iframe} src={`https://open.spotify.com/embed?uri=spotify:album:${this.props.nowPlaying}`} width="100%" height="62%" allowTransparency="true" ></iframe>
      </div>
    )
  }
}