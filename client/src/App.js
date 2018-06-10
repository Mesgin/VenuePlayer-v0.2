import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Main from './components/Main/Main'

// import Navbar from '../Navbar/Navbar'



class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Main} />
          </div>
        </Router >
      </Provider>
    )
  }
}



export default App