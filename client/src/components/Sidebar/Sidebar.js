import React, { Component } from 'react'
const style = {
  sideNav: {
    height: '100%',
    width: '260px',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#111',
    overflowX: 'hidden',
    paddingTop: '20px',
  }
}

export default class Sidebar extends Component {
  render() {
    return (
      <div style={style.sideNav}>
        
      </div>
    )
  }
}
