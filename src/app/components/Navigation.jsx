import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import React from 'react'

export const Navigation = () => {
  return (
    <div>
      <Link to="/dashboard">
        <h1>My App</h1>
      </Link>
    </div>
  )
}

export default connect(state => state)(Navigation)
