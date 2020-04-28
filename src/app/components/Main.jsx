import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import {Redirect} from 'react-router'

import { store } from '../store'
import Dashboard from './Dashboard'
import { history } from '../store/history'
import Navigation from './Navigation'
import TaskDetail from './TaskDetail'
import Login from './login'

const RouteGuard = Component => ({match}) => {
  console.info('Route guard', match)
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />
  } else {
    return <Component match={match} />
  }
}

const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <Navigation />
          <Route
            exact
            path="/"
            component={Login}
          />
          <Route 
            exact 
            path="/dashboard"
            render={RouteGuard(Dashboard)}
          />
          <Route
            exact
            path="/task/:id"
            render={RouteGuard(TaskDetail)}
          />
        </div>
      </Provider>
    </Router>
  )
}

export default Main
