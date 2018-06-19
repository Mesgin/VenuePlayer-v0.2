import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
// import Login from './components/Login/Login'
import Main from './components/Main/Main'
import Artist from './components/Artist/Artist'

class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
            <Route exact path='/artist/:name' component={Artist} />
            <Route exact path='/' component={Main} />
          </div>
        </Router >
      </Provider>
    )
  }
}

export default App