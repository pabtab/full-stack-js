import React from 'react'
import { connect } from 'react-redux'

import * as mutations from '../store/mutations'


export const Login = ({
  authenticateUser,
  authenticated
}) => {
  return (
    <div>
      <h2>Please Login</h2>
      <form onSubmit={authenticateUser} noValidate>
        <input type="text" name="username" placeholder="Username" defaultValue="Dev"/>
        <input type="password" name="password" id="pass" placeholder="Password" defaultValue=""/>
        {
          authenticated === mutations.NOT_AUTHENTICATE 
          ? <p>Login Incorrect</p>
          : null
        }
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target['username'].value
    let password = e.target['password'].value
    dispatch(mutations.requestAuthenticateUser(username, password))

  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
