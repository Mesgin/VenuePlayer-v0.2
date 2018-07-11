import React from 'react'
import { Link } from 'react-router-dom'

export default function() {
  return (
    <div className="not-found">
      <h1>Wrong Place :)</h1>
      <Link to='/'><i className="fa fa-chevron-left"></i></Link>
    </div>
  )
}
