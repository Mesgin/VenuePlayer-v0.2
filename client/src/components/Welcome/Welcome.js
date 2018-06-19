import React, { Component } from 'react'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        {this.state.textValue === null && (
          <div className="welcome" >
            Simply type your favourite artists name to know more about their next upcoming concert, and preview their albums :)
          </div>
        )}
      </div>
    )
  }
}
